function Block(container){
    this.container=container;
    this.mainW=this.container.parentNode.clientWidth;
    this.mainH=this.container.parentNode.clientHeight;
    this.scale=1.58;
    this.height=parseInt(this.mainW/4*this.scale);
    this.top=-this.height;
    this.speed=2;
    this.maxSpeed=20;
    this.timer=null;
    this.state=true;
    this.sum=0;
}
Block.prototype={
    init:function(){
        var _t=this;
        _t.mark();
        _t.container.addEventListener("click",function(e){
            if(!_t.state){
                return false;
            }
            e=e||window.event;
            var target=e.target||e.srcElement;
            if(target.className.indexOf('block')!=-1){
                _t.sum++;
                document.getElementsByClassName("mark")[0].innerHTML=_t.sum;
                target.className='blank';
            }else{
                _t.state=false;
                clearInterval(_t.timer);
                _t.end();
                return false;
            }
        });
    },
    mark:function(){
        var oMark=document.createElement("div");
        oMark.className="mark";
        oMark.innerHTML=this.sum;
        this.container.parentNode.appendChild(oMark);
    },
    addRow:function(){
        var oRow=document.createElement("div");
        oRow.className='row';
        oRow.style.height=this.height+'px';
        var blanks=['blank','blank','blank','blank'];
        var s=Math.floor(Math.random()*4);
        blanks[s]="blank block";
        var oBlank=null;
        for(var i=0;i<4;i++){
            oBlank=document.createElement('div');
            oBlank.className=blanks[i];
            oRow.appendChild(oBlank);
        }
        var fChild=this.container.firstChild;
        if(fChild==null){
            this.container.appendChild(oRow);
        }else{
            this.container.insertBefore(oRow,fChild);
        }
    },
    move:function(){
        this.top+=this.speed;
        this.container.style.top=this.top+"px";
    },
    judge:function () { 
        var _t=this;
        if(_t.top>=0){
            _t.top=-this.height;
            _t.container.style.top=_t.top+'px';
            _t.addRow();
        }
        _t.speed=(parseInt(_t.sum/5)+1)*2
        if(_t.speed>=_t.maxSpeed){_t.speed=_t.maxSpeed;}
        var blocks=document.getElementsByClassName('block');
        for(var j=0;j<blocks.length;j++){
            if(blocks[j].offsetTop>=_t.mainH){
                _t.state=false;
                clearInterval(_t.timer);
                _t.end();
            }
        }
      },
    start:function(){
        var _t=this;
        for(var i=0;i<4;i++){
            _t.addRow();
        }
        _t.timer=setInterval(function(){
            _t.move();
            _t.judge();
        },30);
    },
    end:function(){
        var _t=this;
        if(!document.getElementById("result")){
            var result=document.createElement('div');
            result.className='result';
            result.id='result';
            result.innerHTML='<h1>GAME OVER</h1><h2 id="score">分数: '+_t.sum+'</h2><span id="restart">重新开始</span>';
            _t.container.parentNode.appendChild(result);
        }else{
            var result=document.getElementById("result");
            result.style.display="block";
            var score=document.getElementById("socre");
            score.innerHTML="分数:"+_t.sum;
        }
        var restart=document.getElementById("restart");
        restart.onclick=function(){
            _t.again();
            result.style.display="none";
            return false;
        }
    },
    again:function(){
        this.mainH=this.container.parentNode.clientHeight;
        this.mainW=this.container.parentNode.clientWidth;
        this.scale=1.58;
        this.height=parseInt(this.mainW/4*this.scale);
        this.top=-this.height;
        this.speed=2;
        this.timer=null;
        this.state=true;
        this.sum=0;
        var _t=this;
        _t.container.innerHTML="";
        document.getElementsByClassName('mark')[0].innerHTML=_t.sum;
        _t.start();
    }
}