let today = new Date();

/*this function is used to create a row of 7 divs to represent a week
*/
function create_row(id, array)
{
    //day = ['1','2','3','4','5','6','7']
    let $week = $('<div></div>').attr('id', id).addClass('row');

    for (let i=0; i<7; i++)
    {
        let div = $('<div></div>').hover( function(){
            $(this).css('background-color', '#ffffb2')
        }, function(){
            if ($(this).attr('id') == today.getDate())
                $(this).css('background-color', 'grey')
            else
                $(this).css('background-color', 'white')
        });

        div.html(array[i])
                        .attr('id', array[i])
                        .addClass('col')
                        .appendTo($week)
                        .click(function(){
                            $('<input/>').addClass('form-control').css('background-color', '#add8e6').appendTo(this).click(function(event){
                                event.stopPropagation();//stop progation as to not cause a click on textbox to fireup parent clickevent leading to more textboxes
                            }).on('mouseout', function(){
                                $(this).blur();//imput text losses focus
                            });

                        });
    }
    return $week;
}

function shift(array)//this function is used to shift the integer of the array by 7 for the next set of week dates
{
    array.forEach((element, i, array)=>{
      array[i] = array[i]+7;
    });
    return array;
}

$(document).ready(function(){

    let $days = create_row('days', ['<strong>Sunday</strong>', 
                                '<strong>Monday</strong>', 
                                '<strong>Tuesday</strong>', 
                                '<strong>Wednesday</strong>', 
                                '<strong>Thursday</strong>', 
                                '<strong>Friday</strong>', 
                                '<strong>Saturday</strong>']);
    $('#calendar').prepend($days);

    days = shift([-6,-5,-4,-3,-2,-1,0]);
    let $week1 = create_row('one', days);
    $week1.insertAfter($days);

    days = shift(days);
    let $week2 = create_row('two', days);
    $week2.insertAfter($week1);

    days = shift(days);
    let $week3 = create_row('three', days);
    $week3.insertAfter($week2);

    days = shift(days);
    let $week4 = create_row('four', days);
    $week4.insertAfter($week3);

    days = shift(days);
    let $week5 = create_row('five', days);
    $week5.insertAfter($week4);

    let width = $('#one > div').css('width');//use .outerWidth() instead

    $('#days').nextAll().css('height', width);//close enough to a square but small differences

    /*Turned off animation of the dropped down list for now
    $('#menu-icon').hover(function(){
        let w = $(this).css('width');
        let h = $(this).css('height');
        $(this).animate({height: h+'50px', wight: w+'50px'}, 500, 'swing')
    }, ()=>{});
    */

    let id = '#'.concat(today.getDate());
    $(id).css('background-color', 'grey');
    
});