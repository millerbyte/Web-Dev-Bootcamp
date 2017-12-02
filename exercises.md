### Exercises

#### Section 13
**SELECTOR EXERCISES**
```
document.getElementById('first');
document.getElementsByClassName('special')[0];
document.getElementsByTagName('p');
document.querySelector('#first');
document.querySelector('.special');
document.querySelector('p');
document.querySelectorAll('p')[0];
```

#### Section 14
**COLOR TOGGLE EXERCISE**
```
var btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  btn.classList.toggle("purple");
});
```

OR

```
<button id="btn" onclick="fn(this)">CLICK ME HARDER</button>
<script>
  let fn = (button) => {
    button.classList.toggle("purple");
    alert("CLICK");
  }
</script>
```

#### Section 16
```
  <div>Div 1</div>
  <div class="highlight">Div 2</div>
  <div id="third">Div 3</div>
  <div class="highlight">Div 4</div>
```
```
$("div").css("backgroundColor", "purple");
$("div").css({backgroundColor: "purple"});

$("div.highlight").css("width", "200px");

$("div#third").css("border", "1px solid orange");

$("div:eq(0)").css("color", "pink");
$("div:first-of-type").css("color", "pink");
```
