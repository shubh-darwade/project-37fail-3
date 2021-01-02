class Food {
    constructor(){
    
    this.image=loadImage('images/milk.png');
    }



    display(){
      var x=80,y=50;
      
      imageMode(CENTER);
     
      
      if(foodS!=0){
        for(var i=0;i<foodS;i++){
          if(i%10==0){
            x=80;
            y=y+70;
          }
          image(this.image,x,y,70,70);
          x=x+40;
        }
      }
    }
}