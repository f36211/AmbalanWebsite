import os
from PIL import Image
import pillow_avif

def convert_to_webp(source_path, output_path):
    try:
        image = Image.open(source_path)
        image.save(output_path, 'webp')
        print(f"Converted {source_path} to {output_path}")
    except Exception as e:
        print(f"Error converting {source_path}: {e}")

def main():
    images_dir = os.path.dirname(os.path.abspath(__file__))
    for root, _, files in os.walk(images_dir):
        for file in files:
            if file.startswith('._'):
                continue
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.avif')):
                source_path = os.path.join(root, file)
                output_path = os.path.splitext(source_path)[0] + '.webp'
                convert_to_webp(source_path, output_path)

if __name__ == '__main__':
    main()