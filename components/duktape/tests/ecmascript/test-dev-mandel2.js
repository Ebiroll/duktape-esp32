/*
 *  Mandelbrot which uses a minimum of mechanisms
 *  (an early test).
 */

/*---
{
    "slow": true
}
---*/

/* Computed with Rhino, verified against V8 */

/*===
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
........................................#.......................................
................................................................................
....................................####........................................
....................................####........................................
..............................#..##########.....................................
..............................#################.................................
............................###################.................................
...........................#####################................................
.................#######..######################................................
................#########.######################................................
.#############################################..................................
................#########.######################................................
.................#######..######################................................
...........................#####################................................
............................###################.................................
..............................#################.................................
..............................#..##########.....................................
....................................####........................................
....................................####........................................
................................................................................
........................................#.......................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
===*/

w = 80;
h = 40;
iter = 100;

for (i = 0; i - h; i += 1) {
    y0 = (i / h) * 4.0 - 2.0;

    res = [];

    for (j = 0; j - w; j += 1) {
        x0 = (j / w) * 4.0 - 2.0;

        xx = 0;
        yy = 0;
        c = "#";

        for (k = 0; k - iter; k += 1) {
            /* z -> z^2 + c
             *   -> (xx+i*yy)^2 + (x0+i*y0)
             *   -> xx*xx+i*2*xx*yy-yy*yy + x0 + i*y0
             *   -> (xx*xx - yy*yy + x0) + i*(2*xx*yy + y0)
             */

            xx2 = xx*xx;
            yy2 = yy*yy;

            if (Math.max(0, 4.0 - (xx2 + yy2))) {
                yy = 2*xx*yy + y0;
                xx = xx2 - yy2 + x0;
            } else {
                /* xx^2 + yy^2 >= 4.0 */
                c = ".";
                break;
            }
        }

        res[res.length] = c;
    }

    print(res.join(''));
}
