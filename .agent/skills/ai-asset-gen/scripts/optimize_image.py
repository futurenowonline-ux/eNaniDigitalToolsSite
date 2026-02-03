import sys
import os
import subprocess

def optimize_to_webp(image_path):
    """
    Converts an image to .webp format using the 'sips' utility available on macOS.
    If 'sips' is not available, it fallbacks to a simple warning (requires Pillow).
    """
    if not os.path.exists(image_path):
        print(f"Error: File not found at {image_path}")
        return

    base, ext = os.path.splitext(image_path)
    output_path = f"{base}.webp"

    print(f"Optimizing {image_path} to {output_path}...")

    try:
        # Use macOS 'sips' for conversion
        subprocess.run(["sips", "-s", "format", "webp", image_path, "--out", output_path], check=True)
        print(f"Successfully created {output_path}")
        
        # Optional: Remove original if requested, but for now we keep it and let the agent decide.
        # os.remove(image_path)
        
    except Exception as e:
        print(f"Failed to convert using sips: {e}")
        print("Tip: Ensure you are on macOS or have 'sips' installed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python optimize_image.py <image_path>")
        sys.exit(1)
    
    optimize_to_webp(sys.argv[1])
