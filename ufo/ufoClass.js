'use strict'
class ufoClass extends boxController {

    myUfo(divid, callbackFreq) {
        "use strict";
        console.log(divid.id)
        var contentDiv = document.createElement('div');
        contentDiv.id = 'contentid'
        var visualiserDiv = document.createElement('div');
        visualiserDiv.id = 'visualId'
        var controllsDiv = document.createElement('div');
        var selectWaveForm = document.createElement('select');
        selectWaveForm.id = divid.id + 'type'
        var inputNumber = document.createElement('input');
        inputNumber.id = divid.id + "size"
        inputNumber.type = "number"
        inputNumber.value = "6"
        inputNumber.min = "1"
        inputNumber.max = "40"
        inputNumber.step = "1"


        var inputfreq = document.createElement('input');
        inputfreq.id = divid.id + "freq"
        inputfreq.type = "range"
        inputfreq.value = "0.3"
        inputfreq.min = "0.01"
        inputfreq.max = "3"
        inputfreq.step = "0.01"
        inputfreq.label = "Speed"



        var Square = document.createElement("option");
        Square.text = "square";
        var Square2 = document.createElement("option");
        Square2.text = "square2";
        var Square6 = document.createElement("option");
        Square6.text = "square6";
        var Triangle = document.createElement("option");
        Triangle.text = "triangle";
        var sawtooth = document.createElement("option");
        sawtooth.text = "sawtooth";
        var fibonacci = document.createElement("option");
        fibonacci.text = "fibonacci";
        var pulse = document.createElement("option");
        pulse.text = "pulse";
        selectWaveForm.add(Square);
        selectWaveForm.add(Square2);
        selectWaveForm.add(Square6);
        selectWaveForm.add(Triangle);
        selectWaveForm.add(sawtooth);
        selectWaveForm.add(fibonacci);
        selectWaveForm.add(pulse);


        divid.appendChild(contentDiv)
        contentDiv.appendChild(visualiserDiv)
        contentDiv.appendChild(controllsDiv)
        controllsDiv.appendChild(selectWaveForm)
        controllsDiv.appendChild(inputNumber)
        controllsDiv.appendChild(inputfreq)


        var π = Math.PI
        var τ = 2 * Math.PI

        var types = {
            square: function (n) {
                return (((n + 1) % 2) ? 0 : 1) / n;
            },

            square2: function (n) {
                return (((n + 1) % 3) ? 0 : 1) / n;
            },
            square6: function (n) {
                return (((n + 1) % 6) ? 0 : 1) / n;
            },
            triangle: function (n) {
                if (!(n % 2)) return 0;
                return ((n % 4 === 1) ? 1 : -1) / (n * n);
            },
            sawtooth: function (n) {
                return ((n % 2) ? -1 : 1) / (n + 1);
            },
            fibonacci: function (n) {
                var fst = 0.01,
                    sec = 0.01,
                    add;
                for (var i = 0; i < n; i++) {
                    add = fst + sec;
                    fst = sec;
                    sec = add;
                }
                return add;
            },
            pulse: function (n) {
                return 0.1;
            }
        };

        function FT(A, N, φ) {
            φ = φ || 0;
            return function (x) {
                var n = -1,
                    y = 0;
                while (++n < N) {
                    y += A[n] * Math.sin(τ * (n + 1) * x + φ);
                }
                return y;
            }
        }

        function once(fn) {
            var exec = false;
            return function () {
                if (exec) return;
                exec = true,
                    fn && fn();
            };
        }

        var
            margin = {
                top: 40,
                right: 100,
                bottom: 40,
                left: 150
            },
            W = 960,
            H = 500,
            w = W - margin.left - margin.right,
            h = H - margin.top - margin.bottom,

            radius = 140,
            theta = 0,
            xmax = 1.5,
            rate = 1 / 60,

            tDomain = d3.range(0, 1.1, 1 / 1000), // trace domain
            gDomain = d3.range(0, xmax, xmax / 1000), // graph domain

            C = types.square, // coeffiecients
            L = 6, // size
            F = 0.3, // frequence

            yCirc = d3.scale.linear().domain([-1, 1]).range([h / 2 + radius, h / 2 - radius]),
            xCirc = d3.scale.linear().domain([-1, 1]).range([0, 2 * radius]),
            rAxis = d3.scale.linear().domain([0, 1]).range([0, radius]),
            xAxis = d3.scale.linear().range([radius, W - margin.left]),

            Fxy, fx, fy,

            draw, timer, data = [];

        var graph = d3.svg.line()
            .x(function (d) {
                return xAxis(d);
            })
            .y(function (d) {
                return yCirc(fy(theta - d));
            });

        var proj = d3.svg.line()
            .x(function (d) {
                return xCirc(d.x);
            })
            .y(function (d) {
                return yCirc(d.y);
            });

        var trace = d3.svg.line()
            .x(function (d) {
                return xCirc(fx(d));
            })
            .y(function (d) {
                return yCirc(fy(d));
            });

        function gTransform(d) {
            // console.log((d.y+1)*1000/2)
            callbackFreq((d.y + 1) * 1000 / 2)
            return "translate(" + xCirc(d.x) + "," + yCirc(d.y) + ")";
        }

        function hTransform(d) {
            return "translate(" + xAxis(d.f) + "," + yCirc(0) + ")";
        }

        var svg = d3.select(contentDiv)
            .append("svg")
            .attr("width", W)
            .attr("height", H)

        svg.append("line")
            .attr("class", "axis")
            .attr("y1", margin.top + yCirc(0)).attr("x1", 0)
            .attr("y2", margin.top + yCirc(0)).attr("x2", W);

        svg.append("line")
            .attr("class", "axis")
            .attr("x1", margin.left + xCirc(0)).attr("y1", 0)
            .attr("x2", margin.left + xCirc(0)).attr("y2", H);

        var vis = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var gPath = vis.append("path").attr("class", "graph");
        var tPath = vis.append("path").attr("class", "trace");
        var pPath = vis.append("path").attr("class", "proj");

        function cache() {
            var A;
            if (typeof C === "function") {
                A = d3.range(1, L + 1).map(C);
            } else {
                A = C.slice(0, L);
            }

            fx = FT(A, L - 1, π / 2);
            fy = FT(A, L - 1, 0),

                Fxy = A.map(function (a, i) {
                    return {
                        X: FT(A, i, π / 2),
                        Y: FT(A, i, 0),
                        r: Math.abs(a)
                    };
                });
        }

        function calc() {
            if (!Fxy) cache();
            Fxy.forEach(function (f, i) {
                var d = data[i] || (data[i] = {
                    x: 0,
                    y: 0,
                    r: 0
                });
                d.x = f.X(theta);
                d.y = f.Y(theta);
                d.r = f.r;
                d.f = i + 1;
            });
            data.length = Fxy.length;
            return data;
        }

        function coeff() {
            var co = vis.selectAll(".coeff").data(calc());

            // exit
            co.exit().remove();

            // enter
            var en = co.enter().append("g").attr("class", "coeff");

            en.append("circle").attr("class", "circle");
            en.append("circle").attr("class", "dot").attr("r", 3);

            // update
            co.classed("last", function (d, i) {
                return i === L - 1;
            });
            co.classed("first", function (d, i) {
                return i === 0;
            });

            co.select(".circle").attr("r", function (d) {
                return rAxis(d.r);
            })

            return co;
        }

        function drawGraph() {
            xAxis.domain([0, xmax]);
            coeff().attr("transform", gTransform);
            var last = data[data.length - 1];
            pPath.attr("d", proj([last, {
                x: 0,
                y: last.y
            }]));
            gPath.attr("d", graph(gDomain));
            tPath.attr("d", trace(tDomain));
        }

        function drawHisto() {
            xAxis.domain([1, L]);
            coeff().attr("transform", hTransform);
        }

        function toggle(callback) {
            var tran;
            tran = (draw === drawGraph) ? hTransform : gTransform;
            draw = (draw === drawGraph) ? drawHisto : drawGraph;
            coeff().transition()
                .duration(1000)
                .attr("transform", tran)
                .each("end", once(callback));
        }


        function toggleGraph() {
            xAxis.domain([0, xmax]);
            toggle(function () {
                pPath.classed("hide", false);
                gPath.classed("hide", false);
                tPath.classed("hide", false);
                play();
            });
        }

        function toggleHisto() {
            xAxis.domain([1, L]);
            pPath.classed("hide", true);
            gPath.classed("hide", true);
            tPath.classed("hide", true);
            pause();
            toggle(drawHisto);
        }

        function play() {
            if (timer) return;
            (function loop() {
                drawGraph();
                theta += F * rate;
                timer = setTimeout(loop, rate * 1000);
            })();
        }

        function pause() {
            if (!timer) return;
            clearTimeout(timer);
            timer = null;
        }

        function redraw() {
            cache();
            draw();
        }

        d3.select("svg").on("click", function () {
            (draw === drawHisto) ? toggleGraph(): toggleHisto();
        });

        setTimeout(function () {

        d3.select("#" + divid.id + "freq").on("change", function () {
            F = +this.value;
            redraw();
        });
        d3.select("#" + divid.id + "size").on("change", function () {
            L = +this.value;
            redraw();
        });
        d3.select("#" + divid.id + "type").on("change", function () {
            C = types[this.value];
            redraw();
        });



        },1000)


        var size = nx.add('dial', {
            parent: divid.id,
            name: divid.id + 'Freq',
            w: 70,
            h: 70,
        })

        size.min = 0
        size.max = 2
        size.label = '1-1000'
        size.on('*', function (data) {
            F = +data.value;
            redraw();
        })



        draw = drawGraph;
        play();

    };
}