(function(){

        var theCanvas = document.querySelector("#canvasone");
        var context = theCanvas.getContext("2d");

        // gameover
        var isgameover = false;
        var showgrade = false;

        // load img
        var testimg = new Image();
        testimg.src = "runnerimg/test.gif";
        testimg.onload = function(){
            drawBackground(context);
            drawPerson(context);
            drawLine(context);
        }

        var runimg = new Image();
        runimg.src = "runnerimg/runer.gif";
        runimg.onload = function(){
            AddRuner();
        }
        
        // user data
        var user = {
            speed : 0,
            x : 380,
            y : 110,
            laststep : "",
            meter : 0,
            isrun : false
        };

        var steptime = 0;

        // start line
        var startlinex = -114;
        var startliney = 0;
        var shortlinex = -20;
        var shortliney = 150;

        // end line
        var endline1x = -114 - Math.sin(30*Math.PI/180)*800;
        var endline1y = 0 - Math.cos(30*Math.PI/180)*800;
        var endline2x = -114 - Math.sin(30*Math.PI/180)*1000;
        var endline2y = 0 - Math.cos(30*Math.PI/180)*1000;


        // array of competitors
        var allRuners = [];
        var Runer = function(x, y, speed, laststep, distance, meter, img, changestep, steptime){
            this.x = x;            // x,y
            this.y = y; 
            this.speed = speed;     // speed
            this.laststep = "";        
            this.distance = distance;    
            this.meter = meter;           
            this.img = img,
            this.steptime = steptime
        };
        


        // grade object
        var grade = {
            x : 0,
            y : 0,
            width: 0,
            height: 0,
            complete : false,
            hastext : false,
            showtext : "Winner"
        }


        // time 
        var time1 = null;
        var time2 = null;
        var timetext = "";
        var showtime = true;




        window.addEventListener("keydown", PersonRun, false);
        window.addEventListener("load", canvasApp, false);             // start game

        

        ///////////////////////////////////////////animation//////////////////////////////////////////////


        function canvasApp(){

            // time start
            time1 = +new Date();

            function drawScreen(){

                clearBackground(context);
                drawBackground(context);
                drawLine(context);
                ShowEndLine(context);
                OthersBeginRun();


                if (user.isrun === false){
                    context.drawImage(testimg, 135, 0, 30, 40, user.x, user.y, 60, 80);
                }else{
                    steptime++;
                    if (user.laststep === "left"){
                        
                        if (steptime >= 0 && steptime <= 5){
                            context.drawImage(testimg, 128, 42, 25, 40, user.x, user.y, 50, 80);
                        }else if (steptime > 5 && steptime <= 10){
                            context.drawImage(testimg, 100, 42, 28, 40, user.x, user.y, 56, 80);
                        }else if (steptime > 10){
                            if (isgameover === false){
                                user.isrun = false;
                            }else{
                                user.laststep = "right";
                            }
                            steptime = 0;
                        }

                    }else{

                        if (steptime >= 0 && steptime <= 5){
                            context.drawImage(testimg, 47, 42, 28, 40, user.x, user.y, 56, 80);
                        }else if (steptime > 5 && steptime <= 10){
                            context.drawImage(testimg, 20, 42, 28, 40, user.x, user.y, 56, 80);
                        }else if (steptime > 10){
                            if (isgameover === false){
                                user.isrun = false;
                            }else{
                                user.laststep = "left";
                            }
                            steptime = 0;
                        }
                    }

                }
                
                // show time

                time2 = +new Date();
                if (showtime){
                    timetext = (time2-time1)/1000;
                }
                context.fillStyle = "#fff";
                context.font = "20px YH";
                context.fillText("Time：" + timetext + "s", 800, 50);


                // show grade
                if (showgrade){
                    ShowGrade(context);
                }
            }

        
            gameloop = setInterval(drawScreen, 20);
        }



        // initialize competitors
        function AddRuner(){

            var tempx = 580;
            var tempy = -10;
            
            for (var i = 0; i < 7; i++){

                if (i === 3){
                    tempx -= 100;
                    tempy += 60;
                }else{
                    tempx -= 50;
                    tempy += 30;
                }

                allRuners.push(new Runer(tempx, tempy, Math.floor(Math.random()*17)+5, "", 0, 0, runimg, 0));
                context.drawImage(allRuners[i].img, 2, 45, 20, 40, allRuners[i].x, allRuners[i].y, 40, 80);
            }
            
        }


        // competitors run
        function OthersBeginRun(){

            

            for (var i = 0; i < allRuners.length; i++){




                if (user.isrun && isgameover === false){
                    allRuners[i].x += Math.cos(30*Math.PI/180)*(allRuners[i].speed - user.speed)/5;
                    allRuners[i].y += Math.sin(30*Math.PI/180)*(allRuners[i].speed - user.speed)/5;

                }else{
                    allRuners[i].x += Math.cos(30*Math.PI/180)*(allRuners[i].speed)/5;
                    allRuners[i].y += Math.sin(30*Math.PI/180)*(allRuners[i].speed)/5;
                }

                allRuners[i].meter += allRuners[i].speed;     // set meters


                allRuners[i].steptime++;
                //context.drawImage(allRuners[i].img, 2, 45, 20, 40, allRuners[i].x, allRuners[i].y, 40, 80);
                if (allRuners[i].steptime >= 0 && allRuners[i].steptime <= 5){
                    context.drawImage(allRuners[i].img, 0, 0, 20, 40, allRuners[i].x, allRuners[i].y, 40, 80);
                }else if (allRuners[i].steptime > 5 && allRuners[i].steptime <= 10){
                    context.drawImage(allRuners[i].img, 137, 0, 25, 40, allRuners[i].x, allRuners[i].y, 50, 80);
                }else if (allRuners[i].steptime > 10 && allRuners[i].steptime <= 15){
                    context.drawImage(allRuners[i].img, 110, 0, 25, 40, allRuners[i].x, allRuners[i].y, 50, 80);
                }else if (allRuners[i].steptime > 15 && allRuners[i].steptime <= 20){
                    context.drawImage(allRuners[i].img, 80, 0, 30, 40, allRuners[i].x, allRuners[i].y, 60, 80);
                }else if (allRuners[i].steptime > 20 && allRuners[i].steptime <= 25){
                    context.drawImage(allRuners[i].img, 52, 0, 28, 40, allRuners[i].x, allRuners[i].y, 56, 80);
                }else if (allRuners[i].steptime > 25 && allRuners[i].steptime <= 30){
                    context.drawImage(allRuners[i].img, 24, 0, 28, 40, allRuners[i].x, allRuners[i].y, 56, 80);
                }else{
                    allRuners[i].steptime = 0;
                }
                

                
            }   
        }


        ///////////////////////////////////////////other functions///////////////////////////////////////////////

        function PersonRun(e){

            var keyCode = e.which || e.keyCode;
            var temp = "";
            switch(keyCode){
                case 3:
                case 37:
                case 271:
                    temp = "left";
                    break;
                case 4:
                case 39:
                case 272:
                    temp = "right";
                    break;
            }

            if (temp === user.laststep){
                user.speed = 1;
            }else{
                if (user.speed === 1){
                    user.speed = 5;
                }else if(user.speed < 35){
                    user.speed += 0.5;
                }else{
                    user.speed = 35;
                }
            }


            // mark how many meters
            user.meter += user.speed;
            if (user.meter > 2000){
                endline1x += Math.sin(30*Math.PI/180)*(user.speed);
                endline1y += Math.cos(30*Math.PI/180)*(user.speed);
                endline2x += Math.sin(30*Math.PI/180)*(user.speed);
                endline2y += Math.cos(30*Math.PI/180)*(user.speed);
            }

            if (user.meter > 3000){
                GameOver(context);
            }

            startlinex += Math.sin(30*Math.PI/180)*(user.speed);
            startliney += Math.cos(30*Math.PI/180)*(user.speed);
            shortlinex += Math.sin(30*Math.PI/180)*(user.speed);
            shortliney += Math.cos(30*Math.PI/180)*(user.speed);

            user.isrun = true;

            if (temp === "left"){
                user.laststep = "left";
            }
            else if (temp === "right"){
                user.laststep = "right";
            }
        }


///////////////////////////////////////////////game over/////////////////////////////////////////////////////

        function GameOver(context){

            // remove keydown
            window.removeEventListener("keydown", PersonRun, false);
            user.isrun = true;
            isgameover = true;
            showtime = false;        // time stop
            // be controled by system 
            setInterval(function(){
                user.x += Math.cos(30*Math.PI/180)*15/5;
                user.y += Math.sin(30*Math.PI/180)*15/5;
            }, 20);

            // show grade
            showgrade = true;
            
        }


        function ShowGrade(context){

            context.save();

            context.fillStyle = "#336699";
            if (grade.width >= 100){
                grade.width = 100;
                grade.height = 50;
                grade.complete = true;
            }else{
                grade.x--;
                grade.width += 10;
                grade.height += 5;
            }
            context.fillRect(0, 0, grade.width, grade.height);

            var i = 0;
            if (grade.complete){
                // 秀屏幕现实完全
                if (!grade.hastext){
                    for (; i < allRuners.length; i++){
                        // 判断是否比玩家快
                        if(IsQuickThanUser(i)){
                            grade.showtext = "Loser";
                        }
                    }
                }

                context.fillStyle = "red";
                context.font = "bolder 20px YH";
                context.fillText(grade.showtext, grade.x+30, grade.height/2);
                grade.hastext = true;
            }
            context.restore();
        }


        function IsQuickThanUser(i){
            var overx = allRuners[i].x;
            var overy = allRuners[i].y;

            if (i < 3){
                overx -= (3 - i)*50;
                overy += (3 - i)*30;
            }else{
                overx += (i - 2)*50;
                overy -= (i - 2)*30;
            }

            if (overx > 0 && overy > 0 && overx*overx + overy*overy > user.x*user.x + user.y*user.y){
                return true;
            }
            return false;
        }





/////////////////////////////////////////////show lines/////////////////////////////////////////////////////////


        function ShowEndLine(context){

            // end line
            context.save();
            context.fillStyle = "#fff";
            context.translate(500, 150);
            context.rotate(150*Math.PI/180);
            context.fillRect(endline1x, endline1y, 460, 2);
            context.fillRect(endline2x, endline2y, 460, 2);
            context.font = "200px YH";
            context.fillText("END", endline1x+10, endline1y-20);
            context.restore();

        }





        function drawBackground(context){
            context.fillStyle = "#006000";
            context.fillRect(0, 0, theCanvas.width, theCanvas.height);


            // 画跑道背景
            context.save();
            context.fillStyle = "#c5624b";
            context.translate(500, 150);
            context.rotate(30*Math.PI/180);
            context.fillRect(-1000, -100, theCanvas.width*2, 400);
            context.restore();

            // 画跑道条纹
            context.save();
            context.fillStyle = "#fff";
            context.translate(500, 150);
            context.rotate(30*Math.PI/180);
            context.fillRect(-1000, -100, theCanvas.width*2, 2);
            context.fillRect(-1000, -50, theCanvas.width*2, 2);
            context.fillRect(-1000, 0, theCanvas.width*2, 2);
            context.fillRect(-1000, 50, theCanvas.width*2, 2);
            context.fillRect(-1000, 100, theCanvas.width*2, 2);
            context.fillRect(-1000, 150, theCanvas.width*2, 2);
            context.fillRect(-1000, 200, theCanvas.width*2, 2);
            context.fillRect(-1000, 250, theCanvas.width*2, 2);
            context.fillRect(-1000, 300, theCanvas.width*2, 2);
            context.restore();


            // 画线
            drawLine(context);
        }

        function drawLine(context){
            // 画起跑线
            context.save();
            context.fillStyle = "#fff";
            context.translate(500, 150);
            context.rotate(150*Math.PI/180);
            context.fillRect(startlinex, startliney, 460, 2);

            // 编号后的横杠
            context.fillRect(shortlinex, shortliney, 40,  2);
            context.fillRect(shortlinex+60, shortliney, 40,  2);
            context.fillRect(shortlinex+115, shortliney, 40,  2);
            context.fillRect(shortlinex+175, shortliney, 40,  2);
            context.fillRect(shortlinex+230, shortliney, 40,  2);
            context.fillRect(shortlinex+290, shortliney, 40,  2);
            context.fillRect(shortlinex+350, shortliney, 40,  2);
            context.fillRect(shortlinex+405, shortliney, 40,  2);

            context.restore();
        }

        function clearBackground(context){
            context.clearRect(0, 0, theCanvas.width, theCanvas.height);
        }

        function drawPerson(context){
            // 放小人
            context.save();
            context.drawImage(testimg, 135, 0, 30, 40, user.x, user.y, 60, 80);
            context.restore();
        }


    })();