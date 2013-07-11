// Copyright (C) 2013 Julian Metzler

function saveOptions() {
	var dirs = {};
	for(var i = 0; i < id; i++) {
		if(document.getElementById("dir-" + i) == null) {
			continue;
		}
		var name = document.getElementById("option-name-" + i).value;
		var path = document.getElementById("option-path-" + i).value;
		dirs[name] = {
			"path": path
		};
	}
	localStorage["directories"] = JSON.stringify(dirs);
}

function loadOptions() {
	var dirs = localStorage.hasOwnProperty("directories") ? JSON.parse(localStorage["directories"]) : {};
	for(var key in dirs) {
		if(dirs.hasOwnProperty(key)) {
			var data = dirs[key];
			addDirectory(key, data["path"]);
		}
	}
}

function addDirectory(name, path) {
	var dirContainer = document.getElementById("dir-container");
	dirContainer.innerHTML += [
		'<div id="dir-' + id + '">\n',
		'    <input type="button" id="btn-remove-' + id + '" value="Remove" />\n',
		'    <div class="spacer"></div>\n',
		'    <label for="option-name-' + id + '">Name</label>\n',
		'    <input type="text" id="option-name-' + id + '" value="' + name + '" />\n',
		'    <div class="spacer"></div>\n',
		'    <label for="option-path-' + id + '">Path</label>\n',
		'    <input type="text" id="option-path-' + id + '" value="' + path + '" />\n',
		'</div>\n'
	].join("\n");
	var removeButton = document.getElementById("btn-remove-" + id);
	removeButton.dirId = id;
	removeButton.addEventListener('click', removeDirectoryClickHandler);
	id++;
}

function addDirectoryClickHandler(event) {
	addDirectory("", "", false);
}

function removeDirectory(dirId) {
	var dirContainer = document.getElementById("dir-container");
	var dir = document.getElementById("dir-" + dirId);
	while(dir.firstChild) {
		dir.removeChild(dir.firstChild);
	}
	dirContainer.removeChild(dir);
}

function removeDirectoryClickHandler(event) {
	removeDirectory(event.target.dirId);
}

var id = 0;
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById("btn-add-dir").addEventListener('click', addDirectoryClickHandler);
document.getElementById("btn-save").addEventListener('click', saveOptions);