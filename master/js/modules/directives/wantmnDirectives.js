/**
 * 
 * @authors Zhou Guanqing (essamjo@163.com)
 * @date    2016-04-06 11:50:55
 * @version $Id$
 */


App.directive('checkfn',function(){
    return{
        restrict:'EA',
        link:function(scpoe,element,attr){
            element.bind('click',function(){
                if(element.hasClass('selected')){
                    element.removeClass('selected')
                }
                else{
                    element.addClass('selected')
                }                
            })
        }
    }
})