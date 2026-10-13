alph_au_v2()
function alph_au_v2(){let alph_session=!1
let cookie_data=document.cookie;if(cookie_data.indexOf('alph_au')==-1){alph_session=!0;var expire=new Date();expire.setMinutes(expire.getMinutes()+30);cookies='alph_au=on; path=/';cookies+=';expires='+expire.toGMTString()+';';document.cookie=cookies}
if(typeof CAFE24API=='undefined'){CAFE24API.init('tgHZp6LCG5KuklqvIYgrtB')}
let CAFE24API_MALLID=CAFE24API.MALL_ID
let CAFE24API_SHOPNO=CAFE24API.SHOP_NO
let base_url_log='https://review-widget.alphwidget.com'
$.ajax({url:base_url_log+'/api_widget/module/session',async:!0,type:'GET',data:{'mall_id':CAFE24API_MALLID,'shop_no':CAFE24API_SHOPNO,'view':!0,'session':alph_session,},success:function(json){}})}