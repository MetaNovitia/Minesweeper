import png, array
import os, sys

for fname in ['win.png']:
	reader = png.Reader(filename=fname)
	w, h, rows, metadata = reader.read_flat()
	rows = list(rows)
	print(metadata)

	for i in range(len(rows)):
		if rows[i]!=3 and rows[i]!=6 and rows[i]!=4: rows[i]=0

	output = open(fname, 'wb')
	writer = png.Writer(w, h, **metadata)
	writer.write_array(output, rows)
	output.close()