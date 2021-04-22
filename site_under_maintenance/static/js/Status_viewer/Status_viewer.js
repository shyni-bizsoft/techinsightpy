$(window).load(function() {
        var Dft = sessionStorage.getItem("Dft");
        var sts = sessionStorage.getItem("sts");
        $('#Dft').val(Dft);
        $('#sts').val(sts);
        if(sts=="On a Break" || sts=="Current Online" || sts=="Current Offline" || sts=="Offline"){
            $("#Dft").val("1");
            $("#Dft option[value='2']").attr('disabled', 'disabled');
            $("#Dft option[value='3']").attr('disabled', 'disabled');
            $("#Dft option[value='4']").attr('disabled', 'disabled');
        }
        if($("#tab tbody tr").length > 0){}
        else{
            var d = new Date();
            var n = d.toLocaleString([], { hour12: true});
           $("#tab tbody").append('<tr><th colspan="5">No data available in the table</th></tr>')
        }
    });

(function () {
        function sdrag(onDrag, onStop, direction) {
            var startX = 0;
            var startY = 0;
            var el = this;
            var dragging = false;

            function move(e) {
                var fix = {};
                onDrag && onDrag(el, e.pageX, startX, e.pageY, startY, fix);
                if ('vertical' !== direction) {
                    var pageX = ('pageX' in fix) ? fix.pageX : e.pageX;
                    if ('startX' in fix) {
                        startX = fix.startX;
                    }
                    if (false === ('skipX' in fix)) {
                        el.style.left = (pageX - startX) + 'px';
                    }
                }
                if ('horizontal' !== direction) {
                    var pageY = ('pageY' in fix) ? fix.pageY : e.pageY;
                    if ('startY' in fix) {
                        startY = fix.startY;
                    }
                    if (false === ('skipY' in fix)) {
                        el.style.top = (pageY - startY) + 'px';
                    }
                }
            }

            function startDragging(e) {
                if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
                    dragging = true;
                    var left = el.style.left ? parseInt(el.style.left) : 0;
                    var top = el.style.top ? parseInt(el.style.top) : 0;
                    startX = e.pageX - left;
                    startY = e.pageY - top;
                    window.addEventListener('mousemove', move);
                }
                else {
                    throw new Error("Your target must be an html element");
                }
            }

            this.addEventListener('mousedown', startDragging);
            window.addEventListener('mouseup', function (e) {
                if (true === dragging) {
                    dragging = false;
                    window.removeEventListener('mousemove', move);
                    onStop && onStop(el, e.pageX, startX, e.pageY, startY);
                }
            });
        }
        Element.prototype.sdrag = sdrag;
    })();

    var leftPane = document.getElementById('left-pane');
    var rightPane = document.getElementById('right-pane');
    var paneSep = document.getElementById('panes-separator');
    var leftLimit = 10;
    var rightLimit = 90;

    paneSep.sdrag(function (el, pageX, startX, pageY, startY, fix) {
        fix.skipX = true;

        if (pageX < window.innerWidth * leftLimit / 100) {
            pageX = window.innerWidth * leftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            pageX = window.innerWidth * rightLimit / 100;
            fix.pageX = pageX;
        }

        var cur = pageX / window.innerWidth * 100;
        if (cur < 0) {
            cur = 0;
        }
        if (cur > window.innerWidth) {
            cur = window.innerWidth;
        }


        var right = (100-cur-2);
        leftPane.style.width = cur + '%';
        rightPane.style.width = right + '%';

    }, null, 'horizontal');

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    $(content).toggle(500)
  });
}

function srch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Srch");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
                txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }
        }else{console.log("no")} 
    }
}


$('#Dft').change(function() { 
    var Dft = $('#Dft').val();
    //console.log(Dft)
    sessionStorage.setItem("Dft", Dft);
});

$('#sts').change(function() { 
    var sts = $('#sts').val();
    if(sts=="On a Break" || sts=="Current Online" || sts=="Current Offline" || sts=="Offline"){
        $("#Dft option[value='2']").attr('disabled', 'disabled');
        $("#Dft option[value='3']").attr('disabled', 'disabled');
        $("#Dft option[value='4']").attr('disabled', 'disabled');
        $("#Dft").val("1");
    } 
    else{
        $("#Dft option[value='2']").removeAttr('disabled');
        $("#Dft option[value='3']").removeAttr('disabled');
        $("#Dft option[value='4']").removeAttr('disabled');
    }
    
    sessionStorage.setItem("sts", sts);
});

$('#ref').click(function(){
    location.reload(true);
});