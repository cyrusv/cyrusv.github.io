function login()
	{
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
	}

function leavelogin()
	{
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
	}

function focustext(field)
	{
	if (field=='username' && document.forms[0].username.value=="username")
		{
		document.getElementById("username").className += " activetext";
		document.forms[0].username.value="";
		}
	if (field=='password' && document.forms[0].password.value=="000000000000000")
		{
		document.getElementById("password").className += " activetext";
		document.forms[0].password.value="";
		}
	}

function blurtext(field)
	{
	if (field=='username' && document.forms[0].username.value=="")
		{
		document.getElementById("username").className = document.getElementById("username").className.replace(/\bactivetext\b/,'');
		document.forms[0].username.value="username";
		}

	if (field=='password' && document.forms[0].password.value=="")
		{
		document.getElementById("password").className = document.getElementById("password").className.replace(/\bactivetext\b/,'');
		document.forms[0].password.value="000000000000000";
		}
	}
