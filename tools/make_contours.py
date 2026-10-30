"""
Génère docs/assets/images/contours.svg : un faux relief en courbes de niveau,
utilisé comme masque décoratif (hero, pied de page).

    python tools/make_contours.py            # seed par défaut
    python tools/make_contours.py 7          # autre seed = autre paysage
"""
import sys
import numpy as np
from scipy.ndimage import gaussian_filter
from contourpy import contour_generator

seed = int(sys.argv[1]) if len(sys.argv) > 1 else 11
rng = np.random.default_rng(seed)

W, H = 1600, 900            # taille du viewBox
NX, NY = 400, 225           # résolution de la grille

# Terrain = bruit lissé à deux échelles + quelques sommets gaussiens
z = gaussian_filter(rng.normal(size=(NY, NX)), 26) * 1.0
z += gaussian_filter(rng.normal(size=(NY, NX)), 9) * 0.22
yy, xx = np.mgrid[0:NY, 0:NX]
for cx, cy, s, a in [(0.80, 0.36, 0.16, 0.55), (0.20, 0.72, 0.12, 0.4), (0.50, 0.18, 0.10, 0.25)]:
    z += a * 0.0035 * np.exp(-(((xx / NX - cx) ** 2) + ((yy / NY - cy) ** 2) * 1.8) / (2 * s ** 2)) * 100

z = (z - z.min()) / (z.max() - z.min())
levels = np.linspace(0.06, 0.96, 38)

gen = contour_generator(np.arange(NX), np.arange(NY), z)
sx, sy = W / (NX - 1), H / (NY - 1)

thin, thick = [], []
for i, lv in enumerate(levels):
    bucket = thick if i % 5 == 0 else thin       # courbe maîtresse toutes les 5
    for line in gen.lines(lv):
        pts = line[::2] if len(line) > 40 else line   # allège le fichier
        if len(pts) < 4:
            continue
        d = "M" + " L".join(f"{x*sx:.0f},{y*sy:.0f}" for x, y in pts)
        bucket.append(d)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">
<g fill="none" stroke="#000" stroke-linejoin="round" stroke-linecap="round">
<path stroke-width="1" d="{' '.join(thin)}"/>
<path stroke-width="2.2" d="{' '.join(thick)}"/>
</g>
</svg>'''

out = "docs/assets/images/contours.svg"
open(out, "w").write(svg)
print(out, f"{len(svg)/1024:.0f} KB")
