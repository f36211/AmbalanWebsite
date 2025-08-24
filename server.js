import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite default ports
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware for admin authentication
const authenticateAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ error: 'No authorization header' });
  }
  
  // Simple token validation (you can enhance this)
  const token = authorization.replace('Bearer ', '');
  const validToken = Buffer.from(`${process.env.VITE_ADMIN_USERNAME}:${process.env.VITE_ADMIN_PASSWORD}`).toString('base64');
  
  if (token !== validToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  next();
};

// =====================================================
// DASHBOARD API ROUTES
// =====================================================

// Get dashboard overview data
app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    // Get statistics
    const { data: stats, error: statsError } = await supabase
      .from('site_stats')
      .select('*')
      .order('sort_order');

    if (statsError) throw statsError;

    // Get recent periods
    const { data: periods, error: periodsError } = await supabase
      .rpc('get_periods_data');

    if (periodsError) throw periodsError;

    // Get photos
    const { data: photos, error: photosError } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (photosError) throw photosError;

    // Get learning materials
    const { data: materials, error: materialsError } = await supabase
      .from('learning_materials')
      .select('*')
      .order('sort_order')
      .limit(10);

    if (materialsError) throw materialsError;

    // Get current organization
    const { data: organization, error: orgError } = await supabase
      .from('current_organization')
      .select('*')
      .order('sort_order');

    if (orgError) throw orgError;

    res.json({
      stats: stats || [],
      periods: periods || [],
      photos: photos || [],
      materials: materials || [],
      organization: organization || []
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// PERIODS API ROUTES
// =====================================================


// Get all periods
app.get('/api/admin/periods', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_periods_data');
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Get periods error:', error);
    res.status(500).json({ error: 'Failed to fetch periods' });
  }
});

// Create new period
app.post('/api/admin/periods', authenticateAdmin, async (req, res) => {
  try {
    const { year, image, positions } = req.body;
    
    // Insert period
    const { data: period, error: periodError } = await supabase
      .from('periods')
      .insert([{ year, image }])
      .select()
      .single();

    if (periodError) throw periodError;

    // Insert positions
    if (positions) {
      const positionInserts = [];
      
      // Process putra positions
      if (positions.putra) {
        Object.entries(positions.putra).forEach(([position, name]) => {
          if (name) {
            positionInserts.push({
              period_id: period.id,
              gender: 'putra',
              position,
              name
            });
          }
        });
      }
      
      // Process putri positions
      if (positions.putri) {
        Object.entries(positions.putri).forEach(([position, name]) => {
          if (name) {
            positionInserts.push({
              period_id: period.id,
              gender: 'putri',
              position,
              name
            });
          }
        });
      }

      if (positionInserts.length > 0) {
        const { error: positionsError } = await supabase
          .from('period_positions')
          .insert(positionInserts);

        if (positionsError) throw positionsError;
      }
    }

    res.status(201).json({ message: 'Period created successfully', period });
  } catch (error) {
    console.error('Create period error:', error);
    res.status(500).json({ error: 'Failed to create period' });
  }
});

// Update period
app.put('/api/admin/periods/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { year, image, positions } = req.body;

    // Update period
    const { error: periodError } = await supabase
      .from('periods')
      .update({ year, image })
      .eq('id', id);

    if (periodError) throw periodError;

    // Delete existing positions and insert new ones
    const { error: deleteError } = await supabase
      .from('period_positions')
      .delete()
      .eq('period_id', id);

    if (deleteError) throw deleteError;

    // Insert new positions (same logic as create)
    if (positions) {
      const positionInserts = [];
      
      if (positions.putra) {
        Object.entries(positions.putra).forEach(([position, name]) => {
          if (name) {
            positionInserts.push({
              period_id: id,
              gender: 'putra',
              position,
              name
            });
          }
        });
      }
      
      if (positions.putri) {
        Object.entries(positions.putri).forEach(([position, name]) => {
          if (name) {
            positionInserts.push({
              period_id: id,
              gender: 'putri',
              position,
              name
            });
          }
        });
      }

      if (positionInserts.length > 0) {
        const { error: positionsError } = await supabase
          .from('period_positions')
          .insert(positionInserts);

        if (positionsError) throw positionsError;
      }
    }

    res.json({ message: 'Period updated successfully' });
  } catch (error) {
    console.error('Update period error:', error);
    res.status(500).json({ error: 'Failed to update period' });
  }
});

// Delete period
app.delete('/api/admin/periods/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('periods')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Period deleted successfully' });
  } catch (error) {
    console.error('Delete period error:', error);
    res.status(500).json({ error: 'Failed to delete period' });
  }
});

// =====================================================
// PHOTOS API ROUTES
// =====================================================

// Get all photos
app.get('/api/admin/photos', authenticateAdmin, async (req, res) => {
  try {
    const { category, limit = 50 } = req.query;
    
    let query = supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

// Create new photo
app.post('/api/admin/photos', authenticateAdmin, async (req, res) => {
  try {
    const photoData = req.body;
    
    const { data, error } = await supabase
      .from('photos')
      .insert([photoData])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Photo created successfully', photo: data });
  } catch (error) {
    console.error('Create photo error:', error);
    res.status(500).json({ error: 'Failed to create photo' });
  }
});

// Update photo
app.put('/api/admin/photos/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const photoData = req.body;

    const { error } = await supabase
      .from('photos')
      .update(photoData)
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Photo updated successfully' });
  } catch (error) {
    console.error('Update photo error:', error);
    res.status(500).json({ error: 'Failed to update photo' });
  }
});

// Delete photo
app.delete('/api/admin/photos/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

// =====================================================
// LEARNING MATERIALS API ROUTES
// =====================================================

// Get all learning materials
app.get('/api/admin/materials', authenticateAdmin, async (req, res) => {
  try {
    const { difficulty } = req.query;
    
    let query = supabase
      .from('learning_materials')
      .select('*')
      .order('sort_order');

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Create new material
app.post('/api/admin/materials', authenticateAdmin, async (req, res) => {
  try {
    const materialData = req.body;
    
    const { data, error } = await supabase
      .from('learning_materials')
      .insert([materialData])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Material created successfully', material: data });
  } catch (error) {
    console.error('Create material error:', error);
    res.status(500).json({ error: 'Failed to create material' });
  }
});

// Update material
app.put('/api/admin/materials/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const materialData = req.body;

    const { error } = await supabase
      .from('learning_materials')
      .update(materialData)
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Material updated successfully' });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({ error: 'Failed to update material' });
  }
});

// Delete material
app.delete('/api/admin/materials/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('learning_materials')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ error: 'Failed to delete material' });
  }
});

// =====================================================
// SITE STATS API ROUTES
// =====================================================

// Get site statistics
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_site_stats');
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Update site statistics
app.put('/api/admin/stats/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { label, value } = req.body;

    const { error } = await supabase
      .from('site_stats')
      .update({ label, value, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Statistics updated successfully' });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ error: 'Failed to update statistics' });
  }
});

// =====================================================
// ORGANIZATION API ROUTES
// =====================================================

// Get current organization
app.get('/api/admin/organization', authenticateAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('current_organization')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Get organization error:', error);
    res.status(500).json({ error: 'Failed to fetch organization' });
  }
});

// Update organization member
app.put('/api/admin/organization/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const orgData = req.body;

    const { error } = await supabase
      .from('current_organization')
      .update({ ...orgData, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Organization updated successfully' });
  } catch (error) {
    console.error('Update organization error:', error);
    res.status(500).json({ error: 'Failed to update organization' });
  }
});

// =====================================================
// FILE UPLOAD ROUTE
// =====================================================

// Handle file uploads (you might want to use multer or similar)
app.post('/api/admin/upload', authenticateAdmin, (req, res) => {
  // This is a placeholder - implement proper file upload logic
  // You might want to upload to Supabase Storage, AWS S3, or local storage
  res.json({ message: 'File upload not implemented yet' });
});

// =====================================================
// ERROR HANDLING
// =====================================================

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin API available at http://localhost:${PORT}/api/admin/`);
  console.log(`🏕️  Pramuka Admin Panel Ready!`);
});