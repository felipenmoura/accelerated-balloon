(()=>{
    
    var balloon = document.querySelector('#balloon');
    var lastZ = 0;
    var zDiff = 2;
    var tm = null;
    var wip = 0;
    var wipDivizor = 12;
    
    function handleOrientation(event) {
        var absolute = event.absolute;
        var alpha    = event.alpha;
        var beta     = event.beta;
        var gamma    = event.gamma;
        
        if(Math.abs(lastZ - gamma) > zDiff){
            clearTimeout(tm);
            
            // telling the body about the direction for the animation
            if (gamma < 0) {
                document.body.setAttribute('data-moving', 'right');
            }
            if (gamma < 0) {
                document.body.setAttribute('data-moving', 'left');
            }
            
            
            // adding wipplash effect
            wip = (gamma - lastZ)/wipDivizor;
            
            // rotating the balloon
            balloon.style.transform = "rotateZ("+(-1*(gamma + wip))+"deg)";
            
            tm = setTimeout(_=>{
                // ending the wipplash effect
                balloon.style.transform = "rotateZ("+(-1*(gamma - wip))+"deg)";
                document.body.removeAttribute('data-moving');
            }, 400);
            
            lastZ = gamma;
        }
        
        // gatting farther or closer
        balloon.style.width = (-beta + 200) + 'px';
    }

    window.addEventListener("deviceorientation", handleOrientation, true);

})();
