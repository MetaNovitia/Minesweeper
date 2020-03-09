import png, array
import os, sys
from colors import Color4

color = Color4.l_red
fname = "minesweeper_tiles.png"
result = ["tile","flag","bomb"]
for i in range(9): result+=str(i)

reader = png.Reader(filename=fname)
w, h, rows, metadata = reader.read()
sz = 128
rows = list(rows)
arr = [rows[:128],rows[128:256],rows[256:]]
pics = [[[] for k in range(4)] for i in range(3)]
for i in range(3):
    for j in range(128):
        for k in range(4):
            pics[i][k] += arr[i][j][(k*128)*4:((k+1)*128)*4]

for i in range(3):
    for k in range(4):
        output = open(result[i*4+k]+".png", 'wb')
        writer = png.Writer(sz, sz, greyscale=False, alpha=True)
        
        writer.write_array(output, pics[i][k])
        output.close()