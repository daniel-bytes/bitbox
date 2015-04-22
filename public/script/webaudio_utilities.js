function GetAudioContext()
{
	if (typeof AudioContext !== 'undefined') {
	  return new AudioContext();
	} 
	else if (typeof webkitAudioContext !== 'undefined') {
	  return new webkitAudioContext();
	} 
	else {
		return null;
	}
}