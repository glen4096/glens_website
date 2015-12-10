
            var myForm;
            // wait until page is loaded
            $(document).ready(function (){  
            //myForm = document.getElementById( "myForm" ) ;

            $('#myForm').validate({
                rules: {
                    "num1": {required: true, number:true, range:[0,10000]},
                    "num2": {required: true, number:true, range:[0,10000]},
                    "num3": {required: true, number:true, range:[0,10000]},
                    "num4": {required: true, number:true, range:[0,10000]},
                    "mult1": {required: true, number:true, range:[0,10000]},
                    "mult2": {required: true, number:true, range:[0,10000]},
                    "mult3": {required: true, number:true, range:[0,10000]},
                    "mult4": {required: true, number:true, range:[0,10000]}
                }, //end rules
                messages: {
                    num1: { required: " 1st row number required", range: "number must between 0 and 10,000"},
                    num2: { required: " 2nd row number required", range: "number must between 0 and 10,000"},
                    num3: { required: " 3rd row number required", range: "number must between 0 and 10,000"},
                    num4: { required: " 4th row number required", range: "number must between 0 and 10,000"},
                    mult1: { required: " 1st column number required", range: "number must between 0 and 10,000"},
                    mult2: { required: " 2nd column number required", range: "number must between 0 and 10,00"},
                    mult3: { required: " 3rd column number required", range: "number must between 0 and 10,000"},
                    mult4: { required: " 4th column number required", range: "number must between 0 and 10,000"}
                }   //end messages
            }
            );
            //when user submits multiply button, check validation
            $('#myForm').submit( function(){
                if ($('#myForm').valid()){
                    return multiplyFunction();
                }else{
                $('table').hide();
                }
                });
            
                //set up table inputs so that they are based on the corresponding slider value.
                var sliderOpts_num1 = {
                    max:10000,
                    //slide: function (e, ui){
                    slide: function (e, ui) {
                    //= ui.value
                    $('#num1').val(ui.value);
                    }
                };
                var sliderOpts_num2 = {
                    max:10000,
                    slide: function (e, ui) {
                    $('#num2').val(ui.value);
                    }
                };
                var sliderOpts_num3 = {
                    max:10000,
                    slide: function (e, ui) {
                    $('#num3').val(ui.value);
                    }
                };
                var sliderOpts_num4 = {
                    max:10000,
                    slide: function (e, ui) {
                    $('#num4').val(ui.value);
                }
            };
            
                var sliderOpts_mult1 = {
                    max:10000,
                    //slide: function (e, ui){
                    slide: function (e, ui) {
                    //= ui.value
                    $('#mult1').val(ui.value);
                    }
                };
                var sliderOpts_mult2 = {
                    max:10000,
                    slide: function (e, ui) {
                    $('#mult2').val(ui.value);
                    }
                };
                var sliderOpts_mult3= {
                    max:10000,
                    slide: function (e, ui) {
                    $('#mult3').val(ui.value);
                    }
                };
                var sliderOpts_mult4 = {
                    max:10000,
                    slide: function (e, ui) {
                    $('#mult4').val(ui.value);
                }
            };
            
            //initialize each slider using rules set up above
            $("#num1_slide").slider(sliderOpts_num1);
            $("#num2_slide").slider(sliderOpts_num2);
            $("#num3_slide").slider(sliderOpts_num3);
            $("#num4_slide").slider(sliderOpts_num4);
            $("#mult1_slide").slider(sliderOpts_mult1);
            $("#mult2_slide").slider(sliderOpts_mult2);
            $("#mult3_slide").slider(sliderOpts_mult3);
            $("#mult4_slide").slider(sliderOpts_mult4);
                
            });
            
            $("#tabs").tabs();
            /* this function is called if input is valid */
            function multiplyFunction(){
               
                var plier = [];
                var cand = [];
                strcontent ="";
                //get and parse numbers from the form
                cand[0]= $('#num1').val();
                cand[1]= $('#num2').val();
                cand[2]= $('#num3').val();
                cand[3]= $('#num4').val();
                
                plier[0]= $('#mult1').val();
                plier[1]= $('#mult2').val();
                plier[2]= $('#mult3').val();
                plier[3]= $('#mult4').val();
                
                //perform validation checks and report to user if input isn't valid.
                //*NOTE*: because numbers below 0 are automatically blocked by javascript, I
                        //added the additional requirement that the number needs to be below 10,00
                        // to demonstrate my validation method.
                
                //The first row of the table
                strcontent += '<table width="400px">';           
                strcontent += '<th>' + '' + '</th>' +
                              '<th>' + plier[0] + '</th>' +
                              '<th>' + plier[1] + '</th>'+
                              '<th>' + plier[2] + '</th>' +
                              '<th>' + plier[3] + '</th>' ;
                      
                for(var row=0; row<4; row++){
                    strcontent+='<tr>';
                    //first column
                    strcontent+= '<th>' + cand[row] + '</th>';
                    //table products
                    for( var col=0; col<4; col++){
                        strcontent+='<td>' +(plier[col] * cand[row])+ '</td>';
                    }
                    strcontent+='<tr>';
                } 
                strcontent+='</table>';
               
            $("#contents" ).html(strcontent) ;
            return false;
        }  