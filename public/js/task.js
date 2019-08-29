class Task {
	constructor(argmap) {
		if (argmap.selector) {
			this._element = $(argmap.selector);
			this._id = $(this._element).data('taskinfo').id;
			this._bucketel = $(this._element).find('#bucket');
			this._bucket = $(this._element).data('taskinfo').bucket;
			this._taskel = $(this._element).find('#task');
			this._task = $(this._element).data('taskinfo').task;
			this._statusel = $(this._element).find('#status');
			this._status = $(this._element).data('taskinfo').status;
			this._timeel = $(this._element).find('#time');
			this._time = $(this._element).data('taskinfo').time;
			this._notesel = $(this._element).find('#notes');
			this._notes = $(this._element).data('taskinfo').notes;
			this._descel = $(this._element).find('#desc');
			this._desc = $(this._element).data('taskinfo').description;
			return this;
		} else if (argmap.object) {
			var obj = JSON.parse(argmap.object);
			this._id = obj.id;
			this._element = jQuery('<div/>', { id: obj.id, "class": 'card hovergrow mr-3 border-1-gray', "data-taskinfo": JSON.stringify(obj) });
			this._taskel = jQuery('<div/>', { id: "task", "class": 'card-header bg-gray text-white text-1-5' })
			$(this._taskel).append(jQuery('<span/>', { "class": 'task-text' }).html(obj.task));
			this._completeel = jQuery('<button/>', { id: 'complete', "class": 'closebutton close' }).append(document.querySelector("#checkbox-temp").cloneNode(true));
			$(this._completeel).children("#checkbox-temp").removeAttr("style").attr("id", "checkbox")
			var state = { "#background": { "fill": "#fff", "stroke": "#646464" }, "#checkout": { "display": "inherit" }, "#checkfill": { "height": "0.5rem" } };
			var preclk = (itm) => {
				if (itm._clickedState == 1) {
					itm._element.find("#checkfill").css("display", "none");
				}
			}
			var postclk = (itm) => {
				if (itm._clickedState == 1) {
					itm._element.find("#checkfill").css("display", "inherit");
				}
			}
			this._svg = new SVG({ "element": $(this._completeel).find("svg"), "clickToggle": 1, "clickStyle": state, "preClick": preclk, "postClick": postclk });
			$(this._taskel).append(this._completeel);
			$(this._taskel).appendTo(this._element);
			this._task = obj.task;
			this._bucket = obj.bucket;
			this._bodyel = jQuery('<div/>', { id: "body", "class": 'card-body bg-dark' });
			this._descel = jQuery('<h5/>', { id: "desc", "class": 'card-title bg-gray text-white p-2 text-center rounded-lg' }).html(obj.description).appendTo(this._bodyel);
			this._desc = obj.description;
			this._groupel = jQuery('<ul/>', { id: "group", "class": 'list-group list-group-flush mb-3 wsn' });
			this._statusel = jQuery('<em/>', { id: "status", "class": 'pl-1' }).html(obj.status);
			this._status = obj.status;
			this._timeel = jQuery('<em/>', { id: "time", "class": 'pl-1' }).html(obj.time);
			this._time = obj.time;
			this._notesel = jQuery('<em/>', { id: "notes", "class": 'pl-1' }).html(obj.notes);
			this._notes = obj.notes;
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'status' }).html("Status:")).append(this._statusel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'time' }).html("Time Req:")).append(this._timeel));
			$(this._groupel).append(jQuery('<li/>', { "class": 'list-group-item bg-dark p-0 text-light align-middle border-top-bottom-gray rounded-lg' }).append(jQuery('<label/>', { "class": 'm-0 w-25 text-right border-dark border bg-light-gray rounded-left-lg text-white', "for": 'desc' }).html("Notes:")).append(this._notesel));
			$(this._groupel).appendTo(this._bodyel);
			$(this._bodyel).append(jQuery('<a/>', { "href": '/delete/' + obj.id, "class": 'btn btn-sm btn-danger border border-dark' }).html("Delete"));
			$(this._bodyel).append(jQuery('<button/>', { "type": 'button', "class": 'btn btn-sm btn-warning border border-dark', "data-toggle": 'modal', "data-target": '#editModal', "data-id": obj.id }).html("Edit"));
			$(this._element).append(this._bodyel);
			return this;
		}
	}

	updateInfo(info) {
		$(this._element).attr('data-taskinfo', JSON.stringify(info));
	}

	get element() {
		return this._element;
	}

	get id() {
		return this._id;
	}

	set id(no) {
		this._id = no; $(this._element).attr('id', no); $(this._element).data('taskinfo').id = no;
	}

	get bucket() {
		return this._bucket
	}

	set bucket(no) {
		this._bucket = no; this._bucketel.text(no); $(this._element).data('taskinfo').bucket = no;
	}

	get task() {
		return this._task;
	}

	set task(no) {
		this._task = no; $(this._taskel).text(no); let info = $(this._element).data('taskinfo'); info.task = no; this.updateInfo(info); console.log(info);
	}

	get status() {
		return this._status;
	}

	set status(no) {
		this._status = no; this._statusel.text(no); let info = $(this._element).data('taskinfo'); info.status = no; this.updateInfo(info);
	}

	get time() {
		return this._times;
	}

	set time(no) {
		this._time = no; this._timeel.text(no); let info = $(this._element).data('taskinfo'); info.time = no; this.updateInfo(info);
	}

	get notes() {
		return this._notes;
	}

	set notes(no) {
		this._notes = no; this._notesel.text(no); let info = $(this._element).data('taskinfo'); info.notes = no; this.updateInfo(info);
	}

	get desc() {
		return this._desc;
	}

	set desc(no) {
		this._desc = no; this._descel.text(no); let info = $(this._element).data('taskinfo'); info.description = no; this.updateInfo(info);
	}
}
