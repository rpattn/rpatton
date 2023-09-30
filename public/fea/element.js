var placeElement = false;
var lastNode = null;

function placeElementClicked() {
    placeElement = !placeElement //toggle placeElement state
    placeForce = false;
    removeForce = false;
    elementBtn.style.color = (placeElement)? "green" : "black";
    forceBtn.style.color = (placeForce)? "green" : "black";
    removeForceBtn.style.color = (removeForce)? "red" : "black"
    updateBCS();
    updateForces();
}

function nodeClicked(x, y) {
    if (placeElement) {
        var taken = false;
        nodes.forEach(node => { //check if node exists at current x,y
            if (node[0] == x && node[1] == y) {
                taken = true;
            }
        });
        if (!taken) { //create new node on empty slot
            nodes.push([x,y]);
            boundaryIndicies.push(1); 
            boundaryIndicies.push(1);
            forceIndicies.push(0);
            forceIndicies.push(0);
            if (lastNode != null) {
                elements.push([nodes[lastNode][0], nodes[lastNode][1], x, y]);
                rawElements.push([0,0,0,0])
            }
            lastNode = nodes.length-1;
        } 
        if (taken) { //handle element to existing node 
            if (lastNode == null) {
                for (let i = 0; i < nodes.length; i++) { //Loop to find which element x,y
                    if (nodes[i][0] == x && nodes[i][1] == y) {
                        lastNode = i;
                    }
                }
            } else if(nodes[lastNode][0] != x || nodes[lastNode][1] != y) {
                if (!checkDuplicateNode(nodes[lastNode][0], nodes[lastNode][1], x, y)) {
                    elements.push([nodes[lastNode][0], nodes[lastNode][1], x, y]);
                    rawElements.push([0,0,0,0]) 
                } //reset last node 
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i][0] == x && nodes[i][1] == y) {
                        lastNode = i;
                    }
                }
            } else {
                lastNode = null;
            }
        }
        console.log(taken)
        updateNodes();
    } else if (placeForce) {
        for (let i = 0; i < nodes.length; i++) { //Loop to find which element x,y
            if (nodes[i][0] == x && nodes[i][1] == y) {
                console.log("place")
                forceIndicies[(i*2)] = 0;
                forceIndicies[(i*2)+1] = 1;
                updateNodes();
            }
        }
    }
}

function checkDuplicateNode(x1, y1, x2, y2) {
    dupe = false;
    elements.forEach(element => {
        x1o = element[0];
        y1o = element[1];
        x2o = element[2];
        y2o = element[3];
        if (x1 == x1o && x2 == x2o && y1 == y1o && y2 == y2o) {
            dupe = true;
        } else if (x1 == x2o && x2 == x1o && y1 == y2o && y2 == y1o) {
            dupe = true;
        }
    });
    return dupe;
}

function updateNodes() {
    nodeGrid.innerHTML = '';

    for(let i = 0; i < nodes.length; i++) {
        //node = nodes[i]
        node = (showDeformed)? deformedNodes[i] : nodes[i];
        if ((parseInt(node[0]) >= resolution) || (parseInt(node[1]) >= resolution)) {
            nodes.splice(i); //remove nodes when board resolution changes 
            console.log(resolution)
            continue;
        }
        var nodeElm = document.createElement("div");
        nodeElm.classList.add("node");
        nodeElm.style = 'left: ' + ((node[0]*(width/resolution))+(width/80)) + 'px; top: '
         + ((node[1]*(width/resolution))+(width/6)) + 'px';
        nodeElm.innerHTML = (i+1);
        nodeElm.value = node[0] + ',' + node[1];
        nodeElm.addEventListener('mousedown', function() { //add event listner like grid
            var index = this.value.split(',')
            var x = index[0];
            var y = index[1];
            nodeClicked(x,y);
            //Handle click
        })
        nodeGrid.appendChild(nodeElm);
    };
    updateElements()
    updateBCS()
    updateForces()

    generateKgbb()
    if(!showDeformed) {
        generateLengths()
    }
}

function updateElements() {

    if(deformedNodes == undefined) {deformedNodes = nodes}
    if(hasSolved && !showDeformed) { //no change yet or want to revert back to original nodes 
        //deformedNodes = nodes;
        for(let i = 0; i < elements.length; i++) {
            for (let n = 0; n < nodes.length; n++) {
                if ((elements[i][0] == deformedNodes[n][0]) && (elements[i][1] == deformedNodes[n][1])) {
                    if ((nodes[n][0] != deformedNodes[n][0]) || (nodes[n][1] != deformedNodes[n][1])) {
                        elements[i][0] = nodes[n][0];
                        elements[i][1] = nodes[n][1];
                        rawElements[i] = [0,0,0,0];
                    }
                }
                if ((elements[i][2] == deformedNodes[n][0]) && (elements[i][3] == deformedNodes[n][1])) {
                    if ((nodes[n][0] != deformedNodes[n][0]) || (nodes[n][1] != deformedNodes[n][1])) {
                        elements[i][2] = nodes[n][0];
                        elements[i][3] = nodes[n][1];
                        rawElements[i] = [0,0,0,0];
                    }
                }
            }
        }
    } else if (showDeformed) { //change element matrix to have deformed node coords
        for(let i = 0; i < elements.length; i++) {
            for (let n = 0; n < nodes.length; n++) {
                if ((elements[i][0] == nodes[n][0]) && (elements[i][1] == nodes[n][1])) {
                    if ((nodes[n][0] != deformedNodes[n][0]) || (nodes[n][1] != deformedNodes[n][1])) {
                        elements[i][0] = deformedNodes[n][0];
                        elements[i][1] = deformedNodes[n][1];
                        if(hasSolved) {
                            rawElements[i][0] = rawDisp[n][0];
                            rawElements[i][1] = rawDisp[n][1];
                        }
                    }
                }
                if ((elements[i][2] == nodes[n][0]) && (elements[i][3] == nodes[n][1])) {
                    if ((nodes[n][0] != deformedNodes[n][0]) || (nodes[n][1] != deformedNodes[n][1])) {
                        elements[i][2] = deformedNodes[n][0];
                        elements[i][3] = deformedNodes[n][1];
                        if (hasSolved) {
                            rawElements[i][2] = rawDisp[n][0];
                            rawElements[i][3] = rawDisp[n][1];
                        }
                    }
                }
            }
        }
    }
    if(hasSolved) {
        generateStresses();
        calcRGB();
    }
    for(let i = 0; i < elements.length; i++) {
        element = elements[i];
        x1 = element[0];
        y1 = element[1];
        x2 = element[2];
        y2 = element[3];
        x1 = ((x1*(width/resolution))+(width/25.4))
        x2 = ((x2*(width/resolution))+(width/25.4))
        y1 = ((y1*(width/resolution))+(width/5.25))
        y2 = ((y2*(width/resolution))+(width/5.25))

        var distance = Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
        var xMid = ((x1+x2)/2);
        var yMid = ((y1+y2)/2);

        var slope = (180* Math.atan2(y1 - y2, x1 - x2))/ Math.PI;

        var div = document.createElement("div");
        div.classList.add("element");
        div.style = 'left: ' + (xMid - (distance/2)) + 'px; top: ' + yMid + 'px; width: ' + distance + 'px;';
        div.style.transform = "rotate(" + slope + "deg)";
        var labelElm = document.createElement("a");
        var color = colorList[i];
        colorList.push(color)
        labelElm.innerHTML = i+1  + '<span class="dot" style="background-color: #' + color + ';"></span>';
        labelElm.style.transform = "rotate(" + -slope + "deg)";

        if (showDeformed && hasSolved) {
            div.style.backgroundColor = 'rgb(' + rgb[i] + ')';
        }

        div.appendChild(labelElm);
        nodeGrid.appendChild(div);
    };
    if (!showDeformed) {
        updateKgTable();
    }
}

function removeElement() {
    elements.pop();

    for(let i = 0; i < nodes.length; i++) {
        var nodeContained = false;
        elements.forEach(element => {
            if (nodes[i][0] == element[0] && nodes[i][1] == element[1]
                || nodes[i][0] == element[2] && nodes[i][1] == element[3]) {
                nodeContained = true;
            }
        });
        if (!nodeContained) {
            nodes.splice(i);
        }
    }
    updateNodes();
}

function calcRGB() {
    /*for(let i = 0; i < elements.length; i++) {
        elementStress[i] = Math.abs(elementStress[i])
    }*/
    var vals = []
    for(let i = 0; i < elements.length; i++) {
        var val = 255 * Math.sign(elementStress[i]) * normalize(Math.abs(elementStress[i]), math.max(elementStress), 0);
        if (val < -40) {
            var x = Math.abs(val);
            rgb[i] = '0,' + (100-x) + ',' + x;
        } else if (val < 40) {
            var x = Math.abs(val);
            rgb[i] = (x) + ',' + (255-x) + ',' + (x)
        } else {
            var x = Math.abs(val);
            rgb[i] = '255,' + (255-(x/1.4)) + ',0'
        }
        vals[i] = val;
    }
    console.log(vals)
}

function normalize(val, max, min) { return (val - min) / (max - min); }