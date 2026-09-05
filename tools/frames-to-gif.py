# frames-to-gif.py <frames_dir> <out.gif> <fps>
import sys, glob, os
from PIL import Image
d, out, fps = sys.argv[1], sys.argv[2], float(sys.argv[3])
files = sorted(glob.glob(os.path.join(d, 'f*.png')))
frames = [Image.open(f).convert('RGB') for f in files]
# one shared palette from the first frame keeps colours stable across the loop
base = frames[0].quantize(colors=200, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
pal = [base.quantize(colors=200, palette=base, dither=Image.Dither.FLOYDSTEINBERG) for base in frames] if False else \
      [f.quantize(palette=base, dither=Image.Dither.FLOYDSTEINBERG) for f in frames]
pal[0].save(out, save_all=True, append_images=pal[1:], duration=int(1000 / fps), loop=0, optimize=False, disposal=1)
print(f"{out} -> {len(frames)} frames @ {fps:g}fps, {os.path.getsize(out)//1024} KB")
