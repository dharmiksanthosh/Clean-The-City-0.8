class Form{

    constructor(){

        this.boximg = "images/box.png";
        this.box = createImg(this.boximg);

        this.buttonh = createButton('H');
        this.buttonw = createButton('W');
        this.buttonr = createButton('R');

        this.htxt = createElement('h3');
        this.wtxt = createElement('h3');
        this.rtxt = createElement('h3');
        this.wntxt = createElement('h3');

        this.ctxt = createElement('h3');
    }
    display(){

        this.box.position(width/2-200,height/2-100);
        this.box.size(400,200);

        this.htxt.html('Press H if your Garbage is Hazardous');
        this.wtxt.html('Press W if your Garbage is Wet');
        this.rtxt.html('Press R if your Garbage is Recyclable');
        this.wntxt.html('Press The Button Before Timer Ends');
        this.ctxt.html(count);

        this.htxt.position(width/2-175,height/2-75);
        this.wtxt.position(width/2-175,height/2-100);
        this.rtxt.position(width/2-175,height/2-50);
        this.wntxt.position(width/2-175,height/2+30);
        this.ctxt.position(width/2+155,height/2-110);

        this.htxt.style('font-size','20px');
        this.wtxt.style('font-size','20px');
        this.rtxt.style('font-size','20px');
        this.wntxt.style('font-size','22.5px');
        this.ctxt.style('font-size','22.5px');

        this.wntxt.style('color','red');
        this.ctxt.style('text-align','center');

        this.buttonh.position(width/2-75,height/2);
        this.buttonw.position(width/2-25,height/2);
        this.buttonr.position(width/2+25,height/2);
        this.buttonh.style("background-color", "red");
        this.buttonw.style("background-color", "yellow");
        this.buttonr.style("background-color", "green");
        this.buttonh.size(50,50);
        this.buttonw.size(50,50);
        this.buttonr.size(50,50);
    }
    hide(){

        
        this.box.hide();
        this.buttonh.hide();
        this.buttonr.hide();
        this.buttonw.hide();
        this.htxt.hide();
        this.wtxt.hide();
        this.rtxt.hide();
        this.wntxt.hide();
        this.ctxt.hide();

        count = 15;
    }
    show(){

        this.box.show();
        this.buttonh.show();
        this.buttonr.show();
        this.buttonw.show();
        this.htxt.show();
        this.wtxt.show();
        this.rtxt.show();
        this.wntxt.show();
        this.ctxt.show();

        if (frameCount % round(frameRate()) === 0 && count > -1) {
    
            count --;
        }
    }
}
