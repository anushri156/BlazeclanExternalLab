
function c(val)
{
document.getElementById("num").value=val;
}
function v(val)
{
document.getElementById("num").value = document.getElementById("num").value+val;
}
function e() 
{ 
try 
{ 
  c(eval(document.getElementById("num").value)) 
} 
catch(e) 
{
  c('Error') 
} 
}  