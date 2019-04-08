const getEmptyFn = () => () => {};
const emptyFn = getEmptyFn();

function getValUpdater(start, treshhold, place, fn){
	var iterator = (function*(){
		let val = start;
		while(true){
			yield val++;
			if (val >= treshhold){
				val = 0;
				fn();
			}
		}
	})();
	function updateUnit(){
		document.querySelector(place).innerText = iterator.next().value.toString().padStart(2,"0");
	}
	updateUnit();
	return updateUnit;
}

let time = new Date(),
	h = time.getHours(),
	m = time.getMinutes(),
	s = time.getSeconds();

const getHour = getValUpdater(h, 24, ".clock__hour", emptyFn);
const getMin = getValUpdater(m, 60, ".clock__min", getHour);
const getSec = getValUpdater(s, 60, ".clock__sec", getMin);

var mainInterval = setInterval(getSec,1000);