/*
 *  Brute force hex encode test, try to cover all code paths and all
 *  lookup table indices.
 */

/*@include util-buffer.js@*/
/*@include util-string.js@*/

/*===
00
01
02
03
04
05
06
07
08
09
0a
0b
0c
0d
0e
0f
10
11
12
13
14
15
16
17
18
19
1a
1b
1c
1d
1e
1f
20
21
22
23
24
25
26
27
28
29
2a
2b
2c
2d
2e
2f
30
31
32
33
34
35
36
37
38
39
3a
3b
3c
3d
3e
3f
40
41
42
43
44
45
46
47
48
49
4a
4b
4c
4d
4e
4f
50
51
52
53
54
55
56
57
58
59
5a
5b
5c
5d
5e
5f
60
61
62
63
64
65
66
67
68
69
6a
6b
6c
6d
6e
6f
70
71
72
73
74
75
76
77
78
79
7a
7b
7c
7d
7e
7f
80
81
82
83
84
85
86
87
88
89
8a
8b
8c
8d
8e
8f
90
91
92
93
94
95
96
97
98
99
9a
9b
9c
9d
9e
9f
a0
a1
a2
a3
a4
a5
a6
a7
a8
a9
aa
ab
ac
ad
ae
af
b0
b1
b2
b3
b4
b5
b6
b7
b8
b9
ba
bb
bc
bd
be
bf
c0
c1
c2
c3
c4
c5
c6
c7
c8
c9
ca
cb
cc
cd
ce
cf
d0
d1
d2
d3
d4
d5
d6
d7
d8
d9
da
db
dc
dd
de
df
e0
e1
e2
e3
e4
e5
e6
e7
e8
e9
ea
eb
ec
ed
ee
ef
f0
f1
f2
f3
f4
f5
f6
f7
f8
f9
fa
fb
fc
fd
fe
ff
0
0
1
71808
2
4595712
3
23138304
4
88596480
5
236175360
6
520617984
7
1222017024
8
3005743104
1
2
4
8
15
27
49
88
158
283
507
908
1626
2911
5211
9328
16698
29890
53504
95773
171434
306867
549292
983233
1759988
3150379
5639179
6826955647
000102030405060708090a
0102030405060708090a0b
02030405060708090a0b0c
030405060708090a0b0c0d
0405060708090a0b0c0d0e
05060708090a0b0c0d0e0f
060708090a0b0c0d0e0f10
0708090a0b0c0d0e0f1011
08090a0b0c0d0e0f101112
090a0b0c0d0e0f10111213
0a0b0c0d0e0f1011121314
0b0c0d0e0f101112131415
0c0d0e0f10111213141516
0d0e0f1011121314151617
0e0f101112131415161718
0f10111213141516171819
101112131415161718191a
1112131415161718191a1b
12131415161718191a1b1c
131415161718191a1b1c1d
1415161718191a1b1c1d1e
15161718191a1b1c1d1e1f
161718191a1b1c1d1e1f20
1718191a1b1c1d1e1f2021
18191a1b1c1d1e1f202122
191a1b1c1d1e1f20212223
1a1b1c1d1e1f2021222324
1b1c1d1e1f202122232425
1c1d1e1f20212223242526
1d1e1f2021222324252627
1e1f202122232425262728
1f20212223242526272829
202122232425262728292a
2122232425262728292a2b
22232425262728292a2b2c
232425262728292a2b2c2d
2425262728292a2b2c2d2e
25262728292a2b2c2d2e2f
262728292a2b2c2d2e2f30
2728292a2b2c2d2e2f3031
28292a2b2c2d2e2f303132
292a2b2c2d2e2f30313233
2a2b2c2d2e2f3031323334
2b2c2d2e2f303132333435
2c2d2e2f30313233343536
2d2e2f3031323334353637
2e2f303132333435363738
2f30313233343536373839
303132333435363738393a
3132333435363738393a3b
32333435363738393a3b3c
333435363738393a3b3c3d
3435363738393a3b3c3d3e
35363738393a3b3c3d3e3f
363738393a3b3c3d3e3f40
3738393a3b3c3d3e3f4041
38393a3b3c3d3e3f404142
393a3b3c3d3e3f40414243
3a3b3c3d3e3f4041424344
3b3c3d3e3f404142434445
3c3d3e3f40414243444546
3d3e3f4041424344454647
3e3f404142434445464748
3f40414243444546474849
404142434445464748494a
4142434445464748494a4b
42434445464748494a4b4c
434445464748494a4b4c4d
4445464748494a4b4c4d4e
45464748494a4b4c4d4e4f
464748494a4b4c4d4e4f50
4748494a4b4c4d4e4f5051
48494a4b4c4d4e4f505152
494a4b4c4d4e4f50515253
4a4b4c4d4e4f5051525354
4b4c4d4e4f505152535455
4c4d4e4f50515253545556
4d4e4f5051525354555657
4e4f505152535455565758
4f50515253545556575859
505152535455565758595a
5152535455565758595a5b
52535455565758595a5b5c
535455565758595a5b5c5d
5455565758595a5b5c5d5e
55565758595a5b5c5d5e5f
565758595a5b5c5d5e5f60
5758595a5b5c5d5e5f6061
58595a5b5c5d5e5f606162
595a5b5c5d5e5f60616263
5a5b5c5d5e5f6061626364
5b5c5d5e5f606162636465
5c5d5e5f60616263646566
5d5e5f6061626364656667
5e5f606162636465666768
5f60616263646566676869
606162636465666768696a
6162636465666768696a6b
62636465666768696a6b6c
636465666768696a6b6c6d
6465666768696a6b6c6d6e
65666768696a6b6c6d6e6f
666768696a6b6c6d6e6f70
6768696a6b6c6d6e6f7071
68696a6b6c6d6e6f707172
696a6b6c6d6e6f70717273
6a6b6c6d6e6f7071727374
6b6c6d6e6f707172737475
6c6d6e6f70717273747576
6d6e6f7071727374757677
6e6f707172737475767778
6f70717273747576777879
707172737475767778797a
7172737475767778797a7b
72737475767778797a7b7c
737475767778797a7b7c7d
7475767778797a7b7c7d7e
75767778797a7b7c7d7e7f
767778797a7b7c7d7e7f80
7778797a7b7c7d7e7f8081
78797a7b7c7d7e7f808182
797a7b7c7d7e7f80818283
7a7b7c7d7e7f8081828384
7b7c7d7e7f808182838485
7c7d7e7f80818283848586
7d7e7f8081828384858687
7e7f808182838485868788
7f80818283848586878889
808182838485868788898a
8182838485868788898a8b
82838485868788898a8b8c
838485868788898a8b8c8d
8485868788898a8b8c8d8e
85868788898a8b8c8d8e8f
868788898a8b8c8d8e8f90
8788898a8b8c8d8e8f9091
88898a8b8c8d8e8f909192
898a8b8c8d8e8f90919293
8a8b8c8d8e8f9091929394
8b8c8d8e8f909192939495
8c8d8e8f90919293949596
8d8e8f9091929394959697
8e8f909192939495969798
8f90919293949596979899
909192939495969798999a
9192939495969798999a9b
92939495969798999a9b9c
939495969798999a9b9c9d
9495969798999a9b9c9d9e
95969798999a9b9c9d9e9f
969798999a9b9c9d9e9fa0
9798999a9b9c9d9e9fa0a1
98999a9b9c9d9e9fa0a1a2
999a9b9c9d9e9fa0a1a2a3
9a9b9c9d9e9fa0a1a2a3a4
9b9c9d9e9fa0a1a2a3a4a5
9c9d9e9fa0a1a2a3a4a5a6
9d9e9fa0a1a2a3a4a5a6a7
9e9fa0a1a2a3a4a5a6a7a8
9fa0a1a2a3a4a5a6a7a8a9
a0a1a2a3a4a5a6a7a8a9aa
a1a2a3a4a5a6a7a8a9aaab
a2a3a4a5a6a7a8a9aaabac
a3a4a5a6a7a8a9aaabacad
a4a5a6a7a8a9aaabacadae
a5a6a7a8a9aaabacadaeaf
a6a7a8a9aaabacadaeafb0
a7a8a9aaabacadaeafb0b1
a8a9aaabacadaeafb0b1b2
a9aaabacadaeafb0b1b2b3
aaabacadaeafb0b1b2b3b4
abacadaeafb0b1b2b3b4b5
acadaeafb0b1b2b3b4b5b6
adaeafb0b1b2b3b4b5b6b7
aeafb0b1b2b3b4b5b6b7b8
afb0b1b2b3b4b5b6b7b8b9
b0b1b2b3b4b5b6b7b8b9ba
b1b2b3b4b5b6b7b8b9babb
b2b3b4b5b6b7b8b9babbbc
b3b4b5b6b7b8b9babbbcbd
b4b5b6b7b8b9babbbcbdbe
b5b6b7b8b9babbbcbdbebf
b6b7b8b9babbbcbdbebfc0
b7b8b9babbbcbdbebfc0c1
b8b9babbbcbdbebfc0c1c2
b9babbbcbdbebfc0c1c2c3
babbbcbdbebfc0c1c2c3c4
bbbcbdbebfc0c1c2c3c4c5
bcbdbebfc0c1c2c3c4c5c6
bdbebfc0c1c2c3c4c5c6c7
bebfc0c1c2c3c4c5c6c7c8
bfc0c1c2c3c4c5c6c7c8c9
c0c1c2c3c4c5c6c7c8c9ca
c1c2c3c4c5c6c7c8c9cacb
c2c3c4c5c6c7c8c9cacbcc
c3c4c5c6c7c8c9cacbcccd
c4c5c6c7c8c9cacbcccdce
c5c6c7c8c9cacbcccdcecf
c6c7c8c9cacbcccdcecfd0
c7c8c9cacbcccdcecfd0d1
c8c9cacbcccdcecfd0d1d2
c9cacbcccdcecfd0d1d2d3
cacbcccdcecfd0d1d2d3d4
cbcccdcecfd0d1d2d3d4d5
cccdcecfd0d1d2d3d4d5d6
cdcecfd0d1d2d3d4d5d6d7
cecfd0d1d2d3d4d5d6d7d8
cfd0d1d2d3d4d5d6d7d8d9
d0d1d2d3d4d5d6d7d8d9da
d1d2d3d4d5d6d7d8d9dadb
d2d3d4d5d6d7d8d9dadbdc
d3d4d5d6d7d8d9dadbdcdd
d4d5d6d7d8d9dadbdcddde
d5d6d7d8d9dadbdcdddedf
d6d7d8d9dadbdcdddedfe0
d7d8d9dadbdcdddedfe0e1
d8d9dadbdcdddedfe0e1e2
d9dadbdcdddedfe0e1e2e3
dadbdcdddedfe0e1e2e3e4
dbdcdddedfe0e1e2e3e4e5
dcdddedfe0e1e2e3e4e5e6
dddedfe0e1e2e3e4e5e6e7
dedfe0e1e2e3e4e5e6e7e8
dfe0e1e2e3e4e5e6e7e8e9
e0e1e2e3e4e5e6e7e8e9ea
e1e2e3e4e5e6e7e8e9eaeb
e2e3e4e5e6e7e8e9eaebec
e3e4e5e6e7e8e9eaebeced
e4e5e6e7e8e9eaebecedee
e5e6e7e8e9eaebecedeeef
e6e7e8e9eaebecedeeeff0
e7e8e9eaebecedeeeff0f1
e8e9eaebecedeeeff0f1f2
e9eaebecedeeeff0f1f2f3
eaebecedeeeff0f1f2f3f4
ebecedeeeff0f1f2f3f4f5
ecedeeeff0f1f2f3f4f5f6
edeeeff0f1f2f3f4f5f6f7
eeeff0f1f2f3f4f5f6f7f8
eff0f1f2f3f4f5f6f7f8f9
f0f1f2f3f4f5f6f7f8f9fa
f1f2f3f4f5f6f7f8f9fafb
f2f3f4f5f6f7f8f9fafbfc
f3f4f5f6f7f8f9fafbfcfd
f4f5f6f7f8f9fafbfcfdfe
f5f6f7f8f9fafbfcfdfeff
f6f7f8f9fafbfcfdfeff00
f7f8f9fafbfcfdfeff0001
f8f9fafbfcfdfeff000102
f9fafbfcfdfeff00010203
fafbfcfdfeff0001020304
fbfcfdfeff000102030405
fcfdfeff00010203040506
fdfeff0001020304050607
feff000102030405060708
ff00010203040506070809
===*/

function test() {
    var buf;
    var i, j, len;
    var csum;

    for (i = 0; i < 256; i++) {
        buf = createPlainBuffer(1); buf[0] = i;
        print(Duktape.enc('hex', buf));
    }

    for (len = 0; len <= 8; len++) {
        print(len);
        buf = createPlainBuffer(len);

        csum = 0;
        for (;;) {
            csum += checksumString(Duktape.enc('hex', buf));

            // Full coverage for last byte, sparse coverage for others.
            if (len == 0) { break; }
            buf[len - 1]++;
            if (buf[len - 1] == 0x00) {
                for (i = len - 2; i >= 0; i--) {
                    if (buf[i] == 0xff) {
                        buf[i] = 0x00;
                    } else if (i == len - 2) {
                        buf[i] += 0x11;
                        break;
                    } else {
                        buf[i] += 0xff;  // just cycle 0x00, 0xff
                        break;
                    }
                }
                if (i < 0) { break; }
            }
        }
        print(csum);
    }

    csum = 0;
    for (len = 1; len < 8 * 1024 * 1024; len = Math.floor(len * 1.79 + 1)) {
        print(len);
        buf = createPlainBuffer(len);
        for (i = 0; i < len; i++) { buf[i] = i; }
        csum += checksumString(Duktape.enc('hex', buf));
    }
    print(csum);

    // Scrolling 11 byte window: two fast path blocks (4 input bytes -> 8 output bytes)
    // and 3 leftover bytes.  Every possible input byte goes through every position.
    buf = createPlainBuffer(11);
    for (i = 0; i < 256; i++) {
        for (j = 0; j < buf.length; j++) {
            buf[j] = i + j;
        }
        print(Duktape.enc('hex', buf));
    }
}

try {
    test();
} catch (e) {
    print(e.stack || e);
}
