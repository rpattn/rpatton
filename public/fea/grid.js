<<<<<<< HEAD
function updateGrid() {
    console.log('update grid')
    resolution = gridInput.value;
    grid.innerHTML = '';

    for(let x = 0; x <= resolution; x++) {
        grid.appendChild(addGridLine(0, x*(width/resolution)+ (width/20), false));
        grid.appendChild(addGridLine(x*(width/resolution) - (width/2), (width/2)+(width/20), true));
    }
    for(let x = 1; x < resolution; x++) {
        for(let y = 1; y < resolution; y++) {
            grid.appendChild(addGridPoint(x,y,resolution))
        }
    }

    updateNodes()
}

function addGridLine(x, y, rotate) {
    var line = document.createElement("div");
    line.classList.add("line");
    line.style = 'left: ' + (x+10) + 'px; top: ' + (y-10) + 'px; width: ' + width + 'px;';
    line.style.transform = (rotate)? "rotate(" + 90 + "deg)" : 0;
    return line;
}

function addGridPoint(x,y,resolution) {
    var xp = x*(width/resolution);
    var yp = y*(width/resolution) - (width/20);
    var point = document.createElement("div");
    point.classList.add("point");
    point.style = 'left: ' + (xp - (width/80)) + 'px; top: ' + (yp + (width/22)) + 'px';
    point.value = x + ',' + y
    point.addEventListener('mousedown', function() {
        var index = this.value.split(',')
        var x = index[0];
        var y = index[1];
        console.log(x);
        console.log(y);
        nodeClicked(x,y);
        //Handle click
    })
    return point;
}

function updateBCS() {
    //first get boundary indicies into [[bi,bj],[]] form 
    var bcs = []
    for(let i = 0; i < boundaryIndicies.length; i++) {
        if (i % 2 == 0) {
            bcs.push([boundaryIndicies[i], boundaryIndicies[i+1]])
        }
    }
    
    for(let i = 0; i < bcs.length; i++) {
        var node = nodes[i]
        if (hasSolved && showDeformed) {
            node = deformedNodes[i]
        }
        var point = addGridPoint(node[0],node[1],resolution)
        point.classList = []
        point.classList.add("bc")

        var bcx = document.createElement("div");
        bcx.innerHTML = i*2;
        bcx.addEventListener('click', function() {
            this.classList.forEach(clss => {
                if (clss=="bcx"){
                    removeBC(this.innerHTML)
                } else if (clss=="bcxg"){
                    console.log("add")
                    addBC(this.innerHTML)
                }
            });
        })
        point.appendChild(bcx)

        var bcy = document.createElement("div");
        bcy.innerHTML = (i*2)+1;
        
        bcy.addEventListener('click', function() {
            this.classList.forEach(clss => {
                if (clss=="bcy"){
                    removeBC(this.innerHTML)
                } else if (clss=="bcyg"){
                    console.log("add")
                    addBC(this.innerHTML)
                }
            });
            
        })
        point.appendChild(bcy)

        if (bcs[i][0] == 1) {
            bcx.classList.add("bcx");
        } else {
            bcx.classList.add("bcxg");
        }
        if (bcs[i][1] == 1) {
            bcy.classList.add("bcy");
        } else {
            bcy.classList.add("bcyg");
        }
        if (!placeElement && !placeForce) {bcx.classList.add("noplace");bcy.classList.add("noplace")};
        nodeGrid.appendChild(point)
    }
}

function removeBC(i) {
    boundaryIndicies[i] = 0;
    updateNodes();
}

function addBC(i) {
    boundaryIndicies[i] = 1;
    updateNodes();
}

function updateForces() {

    var frc = []
    for(let i = 0; i < forceIndicies.length; i++) {
        if (i % 2 == 0) {
            frc.push([forceIndicies[i], forceIndicies[i+1]])
        }
    }
    nodeGrid.childNodes.forEach(child => {
        if(child.classList[0] == "frc") {
            child.remove()
        }
    });
    for(let i = 0; i < frc.length; i++) {
        if (frc[i][0] != 0 || frc[i][1] != 0) {

            var x = (showDeformed && hasSolved)? deformedNodes[i][0] : nodes[i][0];
            var y = (showDeformed && hasSolved)? deformedNodes[i][1] : nodes[i][1];
            var point = addGridPoint(x,y,resolution)

            point.classList = []
            point.classList.add("frc")
            var xp = x*(width/resolution) + (width/28);
            var yp = y*(width/resolution) - (width/20) + (width/4.17);

            x1 = xp;
            y1 = yp;
            x2 = xp + (frc[i][0] * 50);
            y2 = yp + (frc[i][1] * 50);

            var distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
            var xMid = ((x1+x2)/2);
            var yMid = ((y1+y2)/2);

            var slope = Math.atan(frc[i][1]/frc[i][0]);
            console.log("slope: " + slope)
            if (slope<0) {
                slope = (Math.PI/2)-slope
            }
            if (frc[i][0] == 0 && frc[i][1] == -1) {
                slope = 3*(Math.PI/2)
            } else if (frc[i][0] == -1 && frc[i][1] == 0) {
                slope = Math.PI
            } else if (frc[i][1] == -1) {
                slope = Math.PI+slope;
            }

            point.style = 'left: ' + (xMid - (distance/2)) + 'px; top: ' + yMid + 'px; width: ' + distance + 'px;';
            point.style.transform = "rotate(" + slope + "rad)";

            var arrow = document.createElement("div");
            arrow.classList.add("frcar");
            arrow.style = 'left: ' + (0.78*distance) + 'px; top: ' + -6 + 'px';
            arrow.style.transform = "rotate(" + -0.85 + "rad)";
            arrow.classList = []
            arrow.classList.add("frcar")
            if(!placeElement && !placeForce) {point.classList.add("place")}
            if(!placeElement && !placeForce) {arrow.classList.add("place")}
            arrow.innerHTML = i;
            point.addEventListener('click', function() {
                if (removeForce) {
                    var i = this.childNodes[0].innerHTML;
                    forceIndicies[(i*2)] = 0;
                    forceIndicies[(i*2)+1] = 0;
                    updateNodes();
                } else {
                    changeForceDir(this.childNodes[0].innerHTML)
                }
            })  
            point.appendChild(arrow)

            nodeGrid.appendChild(point)
        }
        
    }
}

function changeForceDir(i) {
    console.log(i)
    for(let j = 0; j < forceDirections.length; j++) {
        if (forceIndicies[(i*2)] == forceDirections[j][0] && forceIndicies[(i*2)+1] == forceDirections[j][1]) {
            if(j == forceDirections.length-1) {
                j=-1;
                console.log("jover")
            }
            forceIndicies[(i*2)] = forceDirections[j+1][0];
            forceIndicies[(i*2)+1] = forceDirections[j+1][1];
            break; 
        }
    }
    updateNodes()
=======
function updateGrid() {
    console.log('update grid')
    resolution = gridInput.value;
    grid.innerHTML = '';

    for(let x = 0; x <= resolution; x++) {
        grid.appendChild(addGridLine(0, x*(width/resolution)+ (width/20), false));
        grid.appendChild(addGridLine(x*(width/resolution) - (width/2), (width/2)+(width/20), true));
    }
    for(let x = 1; x < resolution; x++) {
        for(let y = 1; y < resolution; y++) {
            grid.appendChild(addGridPoint(x,y,resolution))
        }
    }

    updateNodes()
}

function addGridLine(x, y, rotate) {
    var line = document.createElement("div");
    line.classList.add("line");
    line.style = 'left: ' + (x+10) + 'px; top: ' + (y-10) + 'px; width: ' + width + 'px;';
    line.style.transform = (rotate)? "rotate(" + 90 + "deg)" : 0;
    return line;
}

function addGridPoint(x,y,resolution) {
    var xp = x*(width/resolution);
    var yp = y*(width/resolution) - (width/20);
    var point = document.createElement("div");
    point.classList.add("point");
    point.style = 'left: ' + (xp - (width/80)) + 'px; top: ' + (yp + (width/22)) + 'px';
    point.value = x + ',' + y
    point.addEventListener('mousedown', function() {
        var index = this.value.split(',')
        var x = index[0];
        var y = index[1];
        console.log(x);
        console.log(y);
        nodeClicked(x,y);
        //Handle click
    })
    return point;
}

function updateBCS() {
    //first get boundary indicies into [[bi,bj],[]] form 
    var bcs = []
    for(let i = 0; i < boundaryIndicies.length; i++) {
        if (i % 2 == 0) {
            bcs.push([boundaryIndicies[i], boundaryIndicies[i+1]])
        }
    }
    
    for(let i = 0; i < bcs.length; i++) {
        var node = nodes[i]
        if (hasSolved && showDeformed) {
            node = deformedNodes[i]
        }
        var point = addGridPoint(node[0],node[1],resolution)
        point.classList = []
        point.classList.add("bc")

        var bcx = document.createElement("div");
        bcx.innerHTML = i*2;
        bcx.addEventListener('click', function() {
            this.classList.forEach(clss => {
                if (clss=="bcx"){
                    removeBC(this.innerHTML)
                } else if (clss=="bcxg"){
                    console.log("add")
                    addBC(this.innerHTML)
                }
            });
        })
        point.appendChild(bcx)

        var bcy = document.createElement("div");
        bcy.innerHTML = (i*2)+1;
        
        bcy.addEventListener('click', function() {
            this.classList.forEach(clss => {
                if (clss=="bcy"){
                    removeBC(this.innerHTML)
                } else if (clss=="bcyg"){
                    console.log("add")
                    addBC(this.innerHTML)
                }
            });
            
        })
        point.appendChild(bcy)

        if (bcs[i][0] == 1) {
            bcx.classList.add("bcx");
        } else {
            bcx.classList.add("bcxg");
        }
        if (bcs[i][1] == 1) {
            bcy.classList.add("bcy");
        } else {
            bcy.classList.add("bcyg");
        }
        if (!placeElement && !placeForce) {bcx.classList.add("noplace");bcy.classList.add("noplace")};
        nodeGrid.appendChild(point)
    }
}

function removeBC(i) {
    boundaryIndicies[i] = 0;
    updateNodes();
}

function addBC(i) {
    boundaryIndicies[i] = 1;
    updateNodes();
}

function updateForces() {

    var frc = []
    for(let i = 0; i < forceIndicies.length; i++) {
        if (i % 2 == 0) {
            frc.push([forceIndicies[i], forceIndicies[i+1]])
        }
    }
    nodeGrid.childNodes.forEach(child => {
        if(child.classList[0] == "frc") {
            child.remove()
        }
    });
    for(let i = 0; i < frc.length; i++) {
        if (frc[i][0] != 0 || frc[i][1] != 0) {

            var x = (showDeformed && hasSolved)? deformedNodes[i][0] : nodes[i][0];
            var y = (showDeformed && hasSolved)? deformedNodes[i][1] : nodes[i][1];
            var point = addGridPoint(x,y,resolution)

            point.classList = []
            point.classList.add("frc")
            var xp = x*(width/resolution) + (width/28);
            var yp = y*(width/resolution) - (width/20) + (width/4.17);

            x1 = xp;
            y1 = yp;
            x2 = xp + (frc[i][0] * 50);
            y2 = yp + (frc[i][1] * 50);

            var distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
            var xMid = ((x1+x2)/2);
            var yMid = ((y1+y2)/2);

            var slope = Math.atan(frc[i][1]/frc[i][0]);
            console.log("slope: " + slope)
            if (slope<0) {
                slope = (Math.PI/2)-slope
            }
            if (frc[i][0] == 0 && frc[i][1] == -1) {
                slope = 3*(Math.PI/2)
            } else if (frc[i][0] == -1 && frc[i][1] == 0) {
                slope = Math.PI
            } else if (frc[i][1] == -1) {
                slope = Math.PI+slope;
            }

            point.style = 'left: ' + (xMid - (distance/2)) + 'px; top: ' + yMid + 'px; width: ' + distance + 'px;';
            point.style.transform = "rotate(" + slope + "rad)";

            var arrow = document.createElement("div");
            arrow.classList.add("frcar");
            arrow.style = 'left: ' + (0.78*distance) + 'px; top: ' + -6 + 'px';
            arrow.style.transform = "rotate(" + -0.85 + "rad)";
            arrow.classList = []
            arrow.classList.add("frcar")
            if(!placeElement && !placeForce) {point.classList.add("place")}
            if(!placeElement && !placeForce) {arrow.classList.add("place")}
            arrow.innerHTML = i;
            point.addEventListener('click', function() {
                if (removeForce) {
                    var i = this.childNodes[0].innerHTML;
                    forceIndicies[(i*2)] = 0;
                    forceIndicies[(i*2)+1] = 0;
                    updateNodes();
                } else {
                    changeForceDir(this.childNodes[0].innerHTML)
                }
            })  
            point.appendChild(arrow)

            nodeGrid.appendChild(point)
        }
        
    }
}

function changeForceDir(i) {
    console.log(i)
    for(let j = 0; j < forceDirections.length; j++) {
        if (forceIndicies[(i*2)] == forceDirections[j][0] && forceIndicies[(i*2)+1] == forceDirections[j][1]) {
            if(j == forceDirections.length-1) {
                j=-1;
                console.log("jover")
            }
            forceIndicies[(i*2)] = forceDirections[j+1][0];
            forceIndicies[(i*2)+1] = forceDirections[j+1][1];
            break; 
        }
    }
    updateNodes()
>>>>>>> dafc2641d0c2992b207e80ad8989b6af5aa5b977
}