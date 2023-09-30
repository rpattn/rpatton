kgtable = [];
kelmtable = [];

function updateKelmTable() {
    kelmtableElm.innerHTML = '';
    //elmSelected = kelmSelect.value - 1;
    elmSelected = kelmSelect.selectedIndex;
    console.log(elmSelected)

    var row = document.createElement("tr");
    for(let x = 0; x < 4; x++) {
        var header = document.createElement("th");
        header.innerHTML = getHeader(x);
        row.appendChild(header);
    }
    kelmtableElm.appendChild(row)
    for(let x = 0; x < 4; x++) {
        var row = document.createElement("tr");
        for(let y = 0; y < 4; y++) {
            var data = document.createElement("td");
            //set cell value
            data.innerHTML = getKelmCoeff2(elmSelected, x, y);

            row.appendChild(data);
            if (y==4-1) {
                var header = document.createElement("th");
                header.innerHTML = getHeader(x);
                row.appendChild(header);
            }
        }
        kelmtableElm.appendChild(row)
    }

    kelmSelect.innerHTML = '';
    for(let i = 0; i < elements.length; i++) {
        var dropdown = document.createElement("option")
        dropdown.innerHTML = (i+1)
        if (i == elmSelected - 1) {dropdown.selected = 'selected'}
        kelmSelect.appendChild(dropdown)
    }
    kelmSelect.value = elmSelected + 1;
}

function getKelmCoeff(elmSelected, x, y) {
    var element = elements[elmSelected];
    var slope = 10;
    var length = 1;
    if (element != null) {
        var opp = element[1] - element[3]
        var adj = element[2] - element[0]
        slope = (180* Math.atan2(opp, adj))/ Math.PI
        if(opp<0) {slope = 360+slope}
        length = Math.sqrt(((opp)*(opp))+((adj)*(adj)))
    } else {
        elmSelected = 0;
    }

    var c = Math.cos((slope/180)*Math.PI);
    var s = Math.sin((slope/180)*Math.PI);
    var cs = c * s;
    c = c * c;
    s = s * s;

    var operation = constructMatrix(x,y)
    var innerHtmlVal = "err";
    if (Math.abs(operation) == 1) {
        innerHtmlVal = Math.round((c * Math.sign(operation))*100)/100;
    } else if (Math.abs(operation) == 2) {
        innerHtmlVal = Math.round((s * Math.sign(operation))*100)/100;
    } else if (Math.abs(operation) == 3) {
        innerHtmlVal = Math.round((cs * Math.sign(operation))*100)/100;
    }
    return (innerHtmlVal/length);
}

function updateKgTable() {
    
    var dof = nodes.length * 2;
    kgtableElm.innerHTML = '';
    //drawKgUI();

    //reformat element table to kg indicies
    kgelements = getKgElements(dof);

    var row = document.createElement("tr");
    for(let x = 0; x < dof; x++) {
        var header = document.createElement("th");
        header.innerHTML = getHeader(x);
        if (boundaryIndicies[x] == 0) {
            if(showUI){header.classList.add("thkbb")}
        }
        row.appendChild(header);
    }
    kgtableElm.appendChild(row)
    for(let x = 0; x < dof; x++) {
        var row = document.createElement("tr");
        for(let y = 0; y < dof; y++) {
            var data = document.createElement("td");
            data.innerHTML = kgelements[x][y];
            if (boundaryIndicies[x] == 0) {
                if (boundaryIndicies[y] == 0 && showKbb){data.classList.add("kbb")}
            }
            row.appendChild(data);
            if (y==dof-1) {
                var header = document.createElement("th");
                header.innerHTML = getHeader(x);
                if (boundaryIndicies[x] == 0) {
                    if (showUI){header.classList.add("trkbb")}
                }
                row.appendChild(header);
            }
        }
        kgtableElm.appendChild(row)
    }

    updateKelmTable();
}

function drawKgUI(x,y,i) {
    if (showUI) {
        var box = document.createElement("div");
        box.classList.add('kgBox')
        box.style = 'border-color: #' + colorList[i] + '; top: ' + (1.8 + (x*(14/2))) + 'rem; left: ' + (y*(13.6/2)) + 'rem;';

        kgtableElm.appendChild(box)
    }
}

function getKgElements(dof) {
    newElements = [];
    for(let i = 0; i < dof; i++) {
        newElements[i] = [];
        for(let j = 0; j < dof; j++) {
            newElements[i][j] = " ";
        }
    }
    for (let e = 0; e < elements.length; e++) {
        element = elements[e];
        for(let i = 0; i < nodes.length; i++) {
            if (element[0] == nodes[i][0] && element[1] == nodes[i][1]) {
                
                newElements[(i*2)][(i*2)] += getKelmCoeff(e,0,0) + " ";
                newElements[(i*2)+1][(i*2)] += getKelmCoeff(e,1,0) + " ";
                newElements[(i*2)][(i*2)+1] += getKelmCoeff(e,0,1) + " ";
                newElements[(i*2)+1][(i*2)+1] += getKelmCoeff(e,1,1) + " ";
                for(let b = 0; b < nodes.length; b++) { 
                    if (element[2] == nodes[b][0] && element[3] == nodes[b][1]) {
                        newElements[(i*2)][(b*2)] += getKelmCoeff(e,0,2) + " ";
                        newElements[(i*2)+1][(b*2)] += getKelmCoeff(e,1,2) + " ";
                        newElements[(i*2)][(b*2)+1] += getKelmCoeff(e,0,3) + " ";
                        newElements[(i*2)+1][(b*2)+1] += getKelmCoeff(e,1,3) + " ";
                        //box bellow
                        newElements[(b*2)][(i*2)] += getKelmCoeff(e,2,0) + " ";
                        newElements[(b*2)+1][(i*2)] += getKelmCoeff(e,3,0) + " ";
                        newElements[(b*2)][(i*2)+1] += getKelmCoeff(e,2,1) + " ";
                        newElements[(b*2)+1][(i*2)+1] += getKelmCoeff(e,3,1) + " ";
                        //box bottom right
                        newElements[(b*2)][(b*2)] += getKelmCoeff(e,2,2) + " ";
                        newElements[(b*2)+1][(b*2)] += getKelmCoeff(e,3,2) + " ";
                        newElements[(b*2)][(b*2)+1] += getKelmCoeff(e,2,3) + " ";
                        newElements[(b*2)+1][(b*2)+1] += getKelmCoeff(e,3,3) + " ";
                        if (b != i+1) {
                            drawKgUI(i,i,e);
                            drawKgUI(i,b,e); 
                            drawKgUI(b,i,e); 
                            drawKgUI(b,b,e)
                        } else {
                            if (showUI) {
                                var box = document.createElement("div");
                                box.classList.add('kgBoxBig')
                                box.style = 'border-color: #' + colorList[e] + '; top: ' + (1.8 + (i*(14/2))) + 'rem; left: ' + (i*(13.6/2)) + 'rem;';
                        
                                kgtableElm.appendChild(box)
                            }
                        }
                    }
                }
                //drawKgUI(i,i,e)
            } /*else if (element[2] == nodes[i][0] && element[3] == nodes[i][1]) {
                newElements[i*2][i*2] += (e+1) + " ";
            }*/
        }
    };
    for(let x = 0; x < dof; x++) {
        for(let y = 0; y < dof; y++) {
            var kgcoeffs = newElements[x][y].split(' ');
            var sumtotal = 0;
            for (let i = 0; i < kgcoeffs.length; i++) {
                if (kgcoeffs[i] != '') {
                    sumtotal += parseFloat(kgcoeffs[i]);
                }
            }
            newElements[x][y] = Math.round(sumtotal*100)/100;
        }
    }
    return newElements;
}

function getHeader(i) {
    if (i % 2 == 0) {
        return "u" + ((i/2)+1)
    } else {
        return "v" + (((i-1)/2)+1)
    }
}

function constructMatrix(x,y) {  //c2 ==  1, s2 == 2, cs = 3
    switch(x) {
        case 0:
            switch(y){
                case 0:
                    return 1;
                case 1:
                    return 3;
                case 2:
                    return -1;
                case 3:
                    return -3;
            }
        case 1:
            switch(y){
                case 0:
                    return 3;
                case 1:
                    return 2;
                case 2:
                    return -3;
                case 3:
                    return -2;
            }
        case 2:
            switch(y){
                case 0:
                    return -1;
                case 1:
                    return -3;
                case 2:
                    return 1;
                case 3:
                    return 3;
            }
        case 3:
            switch(y){
                case 0:
                    return -3;
                case 1:
                    return -2;
                case 2:
                    return 3;
                case 3:
                    return 2;
            }
        default:
            return 4;
    }
}
function getKelmCoeff2(elmSelected, x, y) {
    var element = elements[elmSelected];
    var slope = 10;
    var length = 1;
    if (element != null) {
        var opp = element[1] - element[3]
        var adj = element[2] - element[0]
        slope = (180* Math.atan2(opp, adj))/ Math.PI
        if(opp<0) {slope = 360+slope}
        length = Math.sqrt(((opp)*(opp))+((adj)*(adj)))
    } else {
        elmSelected = 0;
    }

    var c = Math.cos((slope/180)*Math.PI);
    var s = Math.sin((slope/180)*Math.PI);
    var cs = c * s;
    c = c * c;
    s = s * s;

    var operation = constructMatrix(x,y)
    var innerHtmlVal = "err";
    if (Math.abs(operation) == 1) {
        innerHtmlVal = Math.round((c * Math.sign(operation))*100)/100;
    } else if (Math.abs(operation) == 2) {
        innerHtmlVal = Math.round((s * Math.sign(operation))*100)/100;
    } else if (Math.abs(operation) == 3) {
        innerHtmlVal = Math.round((cs * Math.sign(operation))*100)/100;
    }
    return (innerHtmlVal);
}