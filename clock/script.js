let time = new Date();
let h = time.getHours();
let m = time.getMinutes();
let s = time.getSeconds();

const clock__hour = document.querySelector(".clock__hour");
const clock__min = document.querySelector(".clock__min");
const clock__sec = document.querySelector(".clock__sec");

const getSec = (function(){
	var iterator = (function*(){
		let sec = s;
		while(true){
			yield sec++;
			if (sec>59){
				sec=0;
				getMin();
			}
		}
	})();
	function secGen(){
		clock__sec.innerText = iterator.next().value.toString().padStart(2,"0");
	}
	secGen();
	return secGen;
})();

const getMin = (function(){
	var iterator = (function*(){
		let min = m;
		while(true){
			yield min++;
			if (min > 59){
				min = 0;
				getHour();
			}
		}
	})();
	function minGen(){
		clock__min.innerText = iterator.next().value.toString().padStart(2,"0");
	}
	minGen();
	return minGen;
})();

const getHour = (function(){
	var iterator = (function*(){
		let hour = h;
		while(true){
			yield hour++;
			if (hour > 23){
				hour = 0;
			}
		}
	})();
	function hourGen(){
		clock__hour.innerText = iterator.next().value.toString().padStart(2,"0");
	}
	hourGen();
	return hourGen;
})();

setInterval(
	()=>getSec()
,1000);