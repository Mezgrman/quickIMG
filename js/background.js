// Copyright (C) 2013 Julian Metzler

function createMenuItems() {
	var CONTEXTS = ["audio", "image", "video"];
	var parentEntry = chrome.contextMenus.create({
		"title": "Download to folder",
		"contexts": CONTEXTS,
		"onclick": clickHandler
	});
	
	var dirs = localStorage.hasOwnProperty("directories") ? JSON.parse(localStorage["directories"]) : {};
	for(var key in dirs) {
		if(dirs.hasOwnProperty(key)) {
			var data = dirs[key];
			var childEntry = chrome.contextMenus.create({
				"title": key,
				"contexts": CONTEXTS,
				"parentId": parentEntry,
				"onclick": clickHandler
			});
			childEntries[childEntry] = data["path"];
		}
	}
}

function downloadFile(url, path) {
	var remoteFilename = url.split("/").slice(-1);
	var pathSeparator = path.indexOf("/") !== -1 ? "/" : "\\";
	var filename = path.slice(-1) == pathSeparator ? path + remoteFilename : path + pathSeparator + remoteFilename;
	alert(filename);
	chrome.downloads.download({
		"url": url,
		"filename": filename,
		"saveAs": false
	});
}

function clickHandler(event) {
	var path = childEntries[event.menuItemId];
	downloadFile(event.srcUrl, path);
}

var childEntries = {};
createMenuItems();