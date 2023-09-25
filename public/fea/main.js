var grid = document.getElementById("grid");
var nodeGrid = document.getElementById("nodes");
var gridInput = document.getElementById("gridInput");
var elementBtn = document.getElementById("elementBtn");
var removeElementBtn = document.getElementById("removeElementBtn")
var kgtableElm = document.getElementById("kgtable");
var kelmtableElm = document.getElementById("kelmtable")
var kelmSelect = document.getElementById("elementSelect");
var dofLabel = document.getElementById("dofLabel");
var solveBtn = document.getElementById("solveBtn");
var uiBtn = document.getElementById("uiBtn");
var kbbBtn = document.getElementById("kbbBtn");
var forceBtn = document.getElementById("placeForce");
var removeForceBtn = document.getElementById("removeForce");
var width = 500;
var resolution = gridInput.value;
var nodes = [['1','1'],['3','3']];
var elements = [['1','1','3','3']]; 
var elmSelected = 0;
var kgelements;

var boundaryIndicies = [1,1,0,0] // 1=DOF fully constrained 
var forceIndicies = [0,0,1,0]
var forceDirections = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]
var transMat = [[2,1,0,0],[-1,2,0,0],[0,0,2,1],[0,0,-1,2]]//1-sin 2-cos
var originalLengths = [];
var rawDisp = [];
var rawElements = [[0,0,0,0]];
var rgb = [];
var elementStress = [];
var stressMat = [];
var colorList = []

var kgbb = [];
var forceIndiciesBb = []
var deformedNodes = []; //= [['1','1'],['3','4']];
var showDeformed = false;
var hasSolved = false;
var showUI = true;
var showKbb = false;
var placeForce = false;
var removeForce = false;

gridInput.addEventListener('input', function() {updateGrid()});
elementBtn.addEventListener('click', function() {placeElementClicked()})
removeElementBtn.addEventListener('click', function() {removeElement()})
kelmSelect.addEventListener('change', function() {updateKelmTable()})
solveBtn.addEventListener('click', function() {solveKg()})
uiBtn.addEventListener('click', function() {showUI = !showUI; updateKgTable()})
kbbBtn.addEventListener('click', function() {showKbb = !showKbb; updateKgTable()})
forceBtn.addEventListener('click', function() {placeForce = !placeForce; forceBtn.style.color = (placeForce)? "green" : "black"; placeElement = false; elementBtn.style.color = (placeElement)? "green" : "black"; removeForce=false; removeForceBtn.style.color = (removeForce)? "red" : "black"; updateNodes()})
removeForceBtn.addEventListener('click', function() {removeForce = !removeForce; removeForceBtn.style.color = (removeForce)? "red" : "black"; placeElement = false; elementBtn.style.color = (placeElement)? "green" : "black"; placeForce=false; forceBtn.style.color = (placeForce)? "green" : "black"; updateNodes()})
kelmSelect.selectedIndex = 0;

generateColors();
updateGrid();  // Update grid draws grid, then calls update nodes then update elements 
updateKgTable();
updateKelmTable();



function solveKg() {
    if (math.det(kgbb) != 0) {
        if (!hasSolved) {
            //console.log("new solve")
            generateKgbb(); //and forceBB
                    
            var inverkgbb = math.inv(kgbb)
            var u = math.multiply(inverkgbb,forceIndiciesBb);
            //rawDisp = u;
            //console.log(u)
            deformedNodes = []
            for(let i = 0; i < nodes.length; i++) {
                if(boundaryIndicies[(i*2)] == 0 && boundaryIndicies[(i*2)+1] == 0) {
                    deformedNodes[i] = [(parseFloat(nodes[i][0]) + u[0]).toString(), 
                    (parseFloat(nodes[i][1]) + u[1]).toString()];
                    rawDisp[i] = [u[0], u[1]]
                    console.log(deformedNodes)
                } else if (boundaryIndicies[(i*2)] != 0 && boundaryIndicies[(i*2)+1] == 0) {
                    deformedNodes[i] = [(parseFloat(nodes[i][0]) + u[0]).toString(), 
                    nodes[i][1]];
                    rawDisp[i] = [u[0], 0]
                } else if (boundaryIndicies[(i*2)] == 0 && boundaryIndicies[(i*2)+1] != 0) {
                    deformedNodes[i] = [nodes[i][0], 
                    (parseFloat(nodes[i][1]) + u[1]).toString()];
                    rawDisp[i] = [0, u[1]]
                } else {
                    deformedNodes[i] = nodes[i]
                    rawDisp[i] = [0,0]
                }
            }
            hasSolved = true;
            solveBtn.style.color = "green";
        }
        showDeformed = !showDeformed;
        updateGrid();
        if (!showDeformed) {
            hasSolved = false;
            solveBtn.style.color = "black";
        }
        //showDeformed = false;
        //updateGrid();
    } else {
        solveBtn.style.color = "red";
    }
}

function generateKgbb() {
    kgbb = []
    forceIndiciesBb = []
    var i = -1;
    for (let x = 0; x < kgelements.length; x++) {
        if (boundaryIndicies[x] == 0) {
            kgbb.push([])
            i += 1;
        }
        for (let y = 0; y < kgelements.length; y++) {
            if (boundaryIndicies[x] == 0 && boundaryIndicies[y] == 0) {
                kgbb[i].push(kgelements[x][y])
            }
        }
    }
    for(let i = 0; i < boundaryIndicies.length; i++) {
        if (boundaryIndicies[i] == 0) {
            forceIndiciesBb.push(forceIndicies[i])

        }
    }
    dofLabel.innerHTML = kgbb.length;
}

function generateColors() {
    for (let i = 0; i < 100; i++) {
        colorList.push(Math.floor(Math.random()*16777215).toString(16));
    }
}

function generateStresses() {
    for(let i = 0; i < elements.length; i++) {
        var e = rawElements[i];
        var slope = Math.atan(e[1] - e[3], e[0] - e[2]);
        var tranMat = generateTransMat(slope);
        var u = math.multiply(tranMat,e);   
        //e = elements[i];
        var l = originalLengths[i]
        e = elements[i];
        var l2 = Math.sqrt(((e[1] - e[3])*(e[1] - e[3]))+((e[0] - e[2])*(e[0] - e[2])))
        var stress = Math.abs(math.multiply([-(1/l),0,(1/l),0],u))
        if (l2 < l) {
            stress = -stress;
        }
        elementStress[i] = stress;
    }
}

function generateTransMat(slope) {
    var newMat = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for (let x=0; x<4; x++) {
        for (let y=0; y<4; y++) {
            if (Math.abs(transMat[x][y]) == 1) {
                newMat[x][y] = Math.sin(slope);
            } else if (Math.abs(transMat[x][y]) == 2) {
                newMat[x][y] = Math.cos(slope);
            } else if (transMat[x][y] == 0) {
                newMat[x][y] = 0;
            }
            newMat[x][y] = newMat[x][y] * Math.sign(transMat[x][y])
        }
    }
    return newMat;
}

function generateLengths() {
    for(let i = 0; i < elements.length; i++) {
        var e = elements[i];
        originalLengths[i] = Math.sqrt(((e[1] - e[3])*(e[1] - e[3]))+((e[0] - e[2])*(e[0] - e[2])))
    }
}