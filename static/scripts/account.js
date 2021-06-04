function saveCustomStructure() {
	let linesID=[]
	$(".class-custom-div-4").each(function( index ) {
	  if ($(this).attr('codeid')!=undefined)
	   linesID.push($(this).attr('codeid'));
	});

	let boxesID=[]
	$(".class-small-window").each(function( index ) {
	  if ($(this).attr('codeid')!=undefined)
	   boxesID.push($(this).attr('codeid'));
	});

	Cookies.set('linesID',linesID.join("|"))
	Cookies.set('boxesID',boxesID.join("|"))
}

function loadCustomStructure() {
	let linesID=Cookies.get('linesID')
	let boxesID=Cookies.get('boxesID')
	
	if (!linesID || !boxesID)
	 return;

	linesID=linesID.split("|")
	boxesID=boxesID.split("|")

	$('.custom').html('')

	linesID.forEach(element => addNewItem(element));

	let count=0;
	$(".class-small-window").each(function( index ) {
	  if ($(this).attr('codeid')!=undefined) {
	   $(this).find('.btn').addClass("changeSelected");
	   addNewItem(boxesID[count]);
	   count++;
	  }
	});
}

function toggleAdd(type, button=null) {
	$(".changeSelected").removeClass("changeSelected");
	
	$('#chooseDiv').toggle();
	$('.class-add-line').hide();
	$('.class-add-box').hide();
	$('.class-add-graph').hide();
	$('.class-add-table').hide();
	if (type=='line')
		$('.class-add-line').show();
	if (type=='box')
		$('.class-add-box').show();
	if (type=='graph')
		$('.class-add-graph').show();
	if (type=='table')
		$('.class-add-table').show();
	if (button)
		$(button).addClass('changeSelected');
}

function addNewItem(button) {
	//let text = $(button).text();
	let text=(($(button).text()=='')?button:$(button).text());
	let emptySmallWindow=`<div class="class-small-window" codeid="000"><div class="btn changeButton" style="height: 10px;margin: auto;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);margin-top: 10%;" onclick="toggleAdd('box',this)">Change</div></div>`;
	if (text=="Line 3" || text=="-001") {
		let classToUse='class="class-custom-div-4" codeid="-001"';
		$('.custom').append('<div id="'+generateUUID()+'" '+classToUse+'>'+emptySmallWindow+emptySmallWindow+emptySmallWindow+'</div');
	}
	else if (text=="Line 4" || text=="-002") {
		let classToUse='class="class-custom-div-4" codeid="-002" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));"';
		$('.custom').append('<div id="'+generateUUID()+'" '+classToUse+'>'+emptySmallWindow+emptySmallWindow+emptySmallWindow+emptySmallWindow+'</div');
	}
	else if (text=="User / Rank / Joined" || text=="001") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="001">
                  <h3 class="class-small-window-title" style="
                     overflow: hidden;
                     text-overflow: ellipsis;
                     ">User</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-account-rank">Rank: <mark><span class="account-rank rank-glowText" style="font-size: 24px; color: white;">Hero</span></mark></div>
                  </div>
                  <div class="class-small-window-secondary-data class-first-joined">Joined: 0 months ago</div>
               </div>`);
	}
	else if (text=="Payout Limit / Pool Donation" || text=="002") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="002">
                  <h3 class="class-small-window-title">Payout Limit</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-min-payout-threshold">
                        0.0 ETH
                     </div>
                  </div>
                  <div class="class-small-window-secondary-data class-pool-donation">Pool Donation: -</div>
               </div>`);
	}
	else if (text=="Control" || text=="003") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="003" style="
                  display: flex;
                  flex-wrap: wrap;
                  align-content: space-around;
                  justify-content: space-between;
                  ">
                  <h3 class="class-wide class-small-window-title" style="height: 30px;">Control</h3>
                  <div class="btn" id="autoRefresh" style="height: 10px;margin-bottom: 2px;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);width: 40%;">Refresh</div>
                  <div class="btn" onclick="reloadData();" id="refreshData" style="height: 10px;margin-bottom: 2px;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);width: 40%;">Reload</div>
                  <div class="btn" id="donateTabToggle" style="height: 10px;margin-bottom: 2px;padding-top: 4px;color: var(--text-color);background: black;border-color: var(--accent-color);border-width: 2px;background-color: var(--accent-color);border-radius: 4px;cursor: pointer;text-align-last: center;width: 40%;">Donate</div>
                  <div class="btn" style="height: 10px;margin-bottom: 2px;padding-top: 4px;color: var(--text-color);background: black;border-color: var(--accent-color);border-width: 2px;background-color: var(--accent-color);border-radius: 4px;cursor: pointer;text-align-last: center;width: 40%;">
<select id="themeSelect" onchange="
                     let themeSelected=$('#themeSelect option:selected').val()
                     if (themeSelected=='togglewidth')
                     {
                     if ($('main').css('max-width')=='980px')
                     {
                     $('main').css('max-width','98%');
                     //$('main').css('margin','0');
                     $('main').css('margin-top','0');
                     }
                     else
                     {
                     $('main').css('max-width','971px');
                     $('main').css('margin','140px auto 0');
                     $('main').css('margin-top','0');
                     }
                     reloadData();//$('#refreshData').click();
                     }
                     else if (themeSelected=='mixthemes')
                     {
                     if (mixThemes==undefined || mixThemes==0)
                     mixThemes=1;
                     else
                     mixThemes=0;
                     }
                     else
                     {
                     clearAnApplyTheme(themeSelected);
                     }" style="
                     border-color: var(--accent-color);
                     background-color: var(--accent-color);
                     color: var(--text-color);
                     cursor: pointer;
                     width: 100%;
                     text-align-last: center;
                     ">
                     <option value="light">Light</option>
                     <option value="dark">Dark</option>
                     <option value="chocolate">Chocolate</option>
                     <option value="chocolate2">Chocolate II: Electric Bugaloo</option>
                     <option value="gb">GB</option>
                     <option value="thudder">Thudder</option>
                     <option value="doge">Doge</option>
                     <option value="boomer">Boomer</option>
                     <option value="elon">Elon</option>
                     <option value="elon2">Elon 2</option>
                     <option value="teameurope">Europe</option>
                     <option value="teameurope2">Europe 2</option>
                     <option value="beta">Beta?</option>
                     <option value="spacecat">Space Cat</option>
                     <option value="darkmario">Dark Mario</option>
                     <option value="mixthemes">Mix Themes</option>
                     <option value="togglewidth">Toggle Width</option>
                  </select>

                  </div>
               </div>`);
	}
	else if (text=="Workers / Reported Hash" || text=="004") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="004">
                  <h3 class="class-small-window-title">Workers Online/Offline</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-online-offline-workers">
                        <div class="">0/<span class="class-alternative-text-color">0</span></div>
                     </div>
                     <div class="class-small-window-secondary-data class-reported_hashrate">Reported: 0.0 MH/s</div>
                  </div>
               </div>`);
	}
	else if (text=="Unpaid Balance / Fiat" || text=="005") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="005">
                  <h3 class="class-small-window-title">Unpaid Balance</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-unpaid-balance">
                        0.0 ETH
                     </div>
                  </div>
                  <div class="class-small-window-secondary-data class-unpaid-balance-usd">
                     ≈ 0.0
                     <div style="margin-left: 6px;" class="currencyString">USD</div>
                  </div>
               </div>`);
	}
	else if (text=="Average Hash / Current Hash" || text=="006") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="006">
                  <h3 class="class-small-window-title">Average Paying Hashrate</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-average_hashrate">
                        0.0 MH/s
                     </div>
                  </div>
                  <div class="class-small-window-secondary-data class-effective_hashrate">Current: 0.0 MH/s</div>
               </div>
            </div>`);
	}
	else if (text=="Pool Hash / Eth Difficulty" || text=="007") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="007">
                  <h3 class="class-small-window-title">Pool Hashrate</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-poolHashrate">0.0 TH/s</div>
                     <div class="class-small-window-secondary-data class-ethdifficulty">ETH Difficulty: 0.0 P</div>
                  </div>
               </div>`);
	}
	else if (text=="Gas Price Limit / Gas Prices" || text=="008") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="008">
                  <h3 class="class-small-window-title">Gas Price Limit</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-currentGasSettings">0 Gwei</div>
                  </div>
                  <div class="class-small-window-secondary-data class-gasPrices">Gas Prices: 0 / 0 / 0</div>
               </div>`);
	}
	else if (text=="Round Share / Appr. Block Reward" || text=="009") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="009">
                  <h3 class="class-small-window-title">Current Round Share</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-round-share-percent">
                        0.0%
                     </div>
                  </div>
                  <div class="class-small-window-secondary-data class-approx-next-block-reward2">Appr.Rew.: 0.0 ETH</div>
               </div>`);
	}
	else if (text=="Approximate Rewards B/D/W/M" || text=="010") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window class-no-bottom-padding" codeid="010">
                  <div class="flexcol class-wide">
                     <h3 class="class-small-window-title">Approximate Rewards</h3>
                     <div class="gray subbalance">
                        <div style="width: 58px;">Block</div>
                        <span class="class-approx-next-block-reward class-rewards-eth-small">0.000000</span>ETH
                        <span class="class-approx-next-block-reward-usd class-rewards-eth-small-currency">0.00</span>
                        &nbsp;
                        <div class="currencyString">USD</div>
                     </div>
                     <div class="gray subbalance">
                        <div style="width: 58px;">Day</div>
                        <span class="class-approx-next-daily-reward class-rewards-eth-small">0.000000</span>ETH
                        <span class="class-approx-next-daily-reward-usd class-rewards-eth-small-currency">0.00</span>
                        &nbsp;
                        <div class="currencyString">USD</div>
                     </div>
                     <div class="gray subbalance">
                        <div style="width: 58px;">07 D</div>
                        <span class="class-approx-next-weekly-reward class-rewards-eth-small">0.000000</span>ETH
                        <span class="class-approx-next-weekly-reward-usd class-rewards-eth-small-currency">0.00</span>
                        &nbsp;
                        <div class="currencyString">USD</div>
                     </div>
                     <div class="gray subbalance">
                        <div style="width: 58px;">30 D</div>
                        <span class="class-approx-next-monthly-reward class-rewards-eth-small">0.000000</span>ETH
                        <span class="class-approx-next-monthly-reward-usd class-rewards-eth-small-currency">0.00</span>
                        &nbsp;
                        <div class="currencyString">USD</div>
                     </div>
                  </div>
               </div>`);
	}
	else if (text=="24 Shares / Valid/Stale/Invalid" || text=="011") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window class-no-bottom-padding" codeid="011">
                  <h3 class="class-small-window-title">24h Shares</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-valid_shares">
                        0 <span class="class-normal-gray-text valid_shares_percentage">Valid (0.00%)</span>
                     </div>
                     <div class="class-small-window-secondary-data class-stale-invalid-shares class-small-font-size">
                        0 Stale (0.00%) / 0 Invalid (0.00%)
                     </div>
                  </div>
               </div>`);
	}
	else if (text=="Next Payment / Reached" || text=="012") {
		$(".changeSelected").parent().replaceWith(`<div class="class-small-window" codeid="012">
                  <h3 class="class-small-window-title">Next Payment</h3>
                  <div class="class-small-window-data">
                     <div class="class-small-window-primary-data class-porcentage-reached">0% Reached</div>
                  </div>
                  <div class="class-small-window-secondary-data class-timeToGetPaid">0 days, 0 hours, 0 mins.</div>
               </div>`);
	}

	$('#chooseDiv').toggle();
	$(".changeSelected").removeClass("changeSelected");
	saveCustomStructure();
}

function toggleEdit(button) {
	if ($(button).attr('edit')=='on') {
		$(button).attr('edit','off');
		$('.editButton').remove();
	}
	else {
		$(button).attr('edit','on');
		$('.editButton').remove();
		$('.class-custom-div-4').append(
`<div class="btn editButton" style="height: 10px;margin-bottom: 2px;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);width: 10px;position: absolute;margin-left: -30px;" onclick="$(this).parent().remove()">X</div>
<div class="btn editButton" style="height: 4px;margin-bottom: 2px;padding-top: 2px;padding-bottom: 14px;background-color: var(--accent-color);color: var(--text-color);width: 10px;position: absolute;margin-left: -30px;margin-top: 30px;font-size: 12px;font-family: system-ui;" onclick="moveLine($(this).parent().attr('id'),-1)">/\\</div>
<div class="btn editButton" style="height: 4px;margin-bottom: 2px;padding-top: 2px;padding-bottom: 14px;background-color: var(--accent-color);color: var(--text-color);width: 10px;position: absolute;margin-left: -30px;margin-top: 56px;font-size: 12px;font-family: system-ui;" onclick="moveLine($(this).parent().attr('id'),1)">\\/</div>`
		);

		$('.class-custom-div-4 .class-small-window').prepend(`<div class="btn editButton" style="height: 10px;margin-bottom: 2px;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);width: 10px;position: absolute;margin-left: -30px;top:0;right:0;" onclick="removeSmallWindow(this)">X</div>`)
		$('.changeButton').parent().find('.editButton').remove()
	}
}

function removeSmallWindow(button) {
	$(button).parent().attr('style','');
	$(button).parent().html(`<div class="btn changeButton" codeid="000" style="height: 10px;margin: auto;padding-top: 4px;background-color: var(--accent-color);color: var(--text-color);margin-top: 10%;" onclick="toggleAdd('box',this)">Change</div>`);
	
	saveCustomStructure();
}

function moveLine(idToUse,whatToChange=1) {
	let mapIndex={}, mapUuid={}, indexToUse=-1, maxIndex=-1;
	$(".class-custom-div-4").each(function( index ) {
		mapIndex[index]=$(this).attr('id');
		mapUuid[$(this).attr('id')]=$(this).html()+'|||'+$(this).attr('class')+'|||'+$(this).attr('style');
	
		if ($(this).attr('id')==idToUse) {
			indexToUse=index;
		}
		if (maxIndex<index) maxIndex=index;
	});
	
	if ((whatToChange<0 && indexToUse>0) || (whatToChange>0 && indexToUse<maxIndex))
	{
		let tempToChange=mapUuid[mapIndex[indexToUse+whatToChange]]
		let tempOwn=mapUuid[mapIndex[indexToUse]]
	
		$('#'+mapIndex[indexToUse+whatToChange]).html(tempOwn.split('|||')[0])
		$('#'+mapIndex[indexToUse+whatToChange]).attr('class',tempOwn.split('|||')[1])
		$('#'+mapIndex[indexToUse+whatToChange]).attr('style',tempOwn.split('|||')[2])
		
		$('#'+mapIndex[indexToUse]).html(tempToChange.split('|||')[0])
		$('#'+mapIndex[indexToUse]).attr('class',tempToChange.split('|||')[1])
		$('#'+mapIndex[indexToUse]).attr('style',tempToChange.split('|||')[2])
	}
	saveCustomStructure();
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function load_js(file) { //code
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = file;
	//var newContent = document.createTextNode(code);
	//script.appendChild(newContent);
	head.appendChild(script);
}

function formatMoneyCents(value)
{
	if (value.indexOf('.')==-1)
		value=value+'.00';
	else if (value.split('.')[1].length==0)
		value=value+'00';
	else if (value.split('.')[1].length==1)
		value=value+'0';
	return value;
}

function clearAnApplyTheme(theme) {
	document.cookie = "theme='" + theme + "'"
	var listOfThemes = ['chocolate', 'chocolate2', 'thudder', 'doge', 'boomer', 'elon', 'elon2', 'teameurope', 'teameurope2', 'gb', 'beta', 'spacecat', 'darkmario'],
		i = 0
	if (mixThemes == undefined || mixThemes == 0)
		for (i = 0; i < listOfThemes.length; i++) $('#' + listOfThemes[i]).attr('disabled', 'disabled');
	else $('#' + theme).attr('disabled', 'disabled');
	applyDarkMode('dark');
	if (theme == 'light') {
		applyDarkMode('');
	} else if (theme != 'dark') {
		if (!document.getElementById(theme)) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.id = theme;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = '/static/css/' + theme + '.css';
			link.media = 'all';
			head.appendChild(link);
		}
		$('#' + theme).removeAttr('disabled');
	}
	rank=applyPoolDonation(null, theme);
	$(".account-rank").html(rank[0])
	
	let cookieTheme=document.cookie.split("theme='")
        if (cookieTheme !== undefined && cookieTheme.length>1)
               	cookieTheme=cookieTheme[1].split("'")[0];
	if (cookieTheme!='' && cookieTheme!=undefined) {
		document.getElementById('themeSelect').value = cookieTheme;
	}
	else {
		document.getElementById('themeSelect').value = 'dark';
	}

}
Number.prototype.countDecimals = function() {
	if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
	return this.toString().split(".")[0].length || 0;
}

function getRandomIntInclusive(e, t) {
	return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e
}

function scrollToTop() {
	$("html, body").animate({
		scrollTop: 0
	}, 500)
}

function renderStats(e) {
	$("#worker-" + window.prev_worker).removeClass("selected"), "" != e ? (scrollToTop(), $("#worker-" + e).addClass("selected"), $("#worker-header .name").html(e), $("#worker-header").show(), $("#worker-header").css("visibility", "visible"), $("#worker-header .name").show(), $("#worker-header").animate({
		height: 100
	}, 500)) : "" != window.prev_worker && $("#worker-header").animate({
		height: 0
	}, 500, (function() {
		$("#worker-header").hide()
	})), window.prev_worker = e, renderHeader(e), url = "" == e ? `https://old.flexpool.io/api/v1/miner/${window.wallet}/chart` : `https://old.flexpool.io/api/v1/worker/${window.wallet}/${e}/chart`, $.get(url, {}, (function(e) {
		effective_hashrate_chartdata = [], reported_hashrate_chartdata = [], average_effective_hashrate_chartdata = [], valid_shares_chartdata = [], stale_shares_chartdata = [], invalid_shares_chartdata = [], data = e.result, effective_hashrate_avg = [], data.forEach((function(e, t) {
			0 != e.effective_hashrate && effective_hashrate_avg.push(e.effective_hashrate)
		})), effective_hashrate_avg = arrAvg(effective_hashrate_avg), si = getSi(effective_hashrate_avg), window.chart_hasrate_si = si[1], data.forEach((function(e, t) {
			effective_hashrate_chartdata.push([1e3 * e.timestamp, e.effective_hashrate / si[0]]), reported_hashrate_chartdata.push([1e3 * e.timestamp, e.reported_hashrate / si[0]]), average_effective_hashrate_chartdata.push([1e3 * e.timestamp, e.average_effective_hashrate / si[0]]), valid_shares_chartdata.push([1e3 * e.timestamp, e.valid_shares]), stale_shares_chartdata.push([1e3 * e.timestamp, e.stale_shares]), invalid_shares_chartdata.push([1e3 * e.timestamp, e.invalid_shares])
		})), avg_effective_data_12h = [], avg_effective_data_6h = [], effective_hashrate_chartdata.forEach((function(e, t) {
			t <= 36 && avg_effective_data_6h.push(e[1]), t <= 72 && avg_effective_data_12h.push(e[1])
		})), avg_effective_12h = avg_effective_data_12h.reduce(((e, t) => e + t), 0) / avg_effective_data_12h.length, avg_effective_6h = avg_effective_data_6h.reduce(((e, t) => e + t), 0) / avg_effective_data_6h.length, $("#12h-avg-hashrate").html(`${Math.round(10*avg_effective_12h)/10} ${window.chart_hasrate_si}H/s`), $("#12h-avg-hashrate2").html(`${Math.round(10*avg_effective_12h)/10} ${window.chart_hasrate_si}H/s`), $("#6h-avg-hashrate").html(`${Math.round(10*avg_effective_6h)/10} ${window.chart_hasrate_si}H/s`), $("#6h-avg-hashrate2").html(`${Math.round(10*avg_effective_6h)/10} ${window.chart_hasrate_si}H/s`), renderStatsCharts(effective_hashrate_chartdata, reported_hashrate_chartdata, average_effective_hashrate_chartdata, valid_shares_chartdata, stale_shares_chartdata, invalid_shares_chartdata)
	}))
}

function renderHeader(e) { /*
	url = "" == e ? `https://api.flexpool.io/v2/miner/workers?coin=eth&address=${window.wallet}` : `https://api.flexpool.io/v2/miner/workers?coin=eth&address=${window.wallet}&worker=${e}`, $.get(url, {}, (function(e) {

		        let valid_sharesP=0;let invalid_sharesP=0;let stale_sharesP=0;
			data = e.result,
			effective_hashrate = sif(data.currentEffectiveHashrate),
			average_effective = sif(data.averageEffectiveHashrate),
			reported_hashrate = sif(data.reportedHashrate),
			$("#effective_hashrate, #effective_hashrate2").html(`<mark class="big">${effective_hashrate[0]}</mark> ${effective_hashrate[1]}H/s`),
			$(".class-effective_hashrate").html(`Current: ${effective_hashrate[0]} ${effective_hashrate[1]}H/s`),
			$("#average_hashrate, #average_hashrate2").html(`<mark class="big">${average_effective[0]}</mark> ${average_effective[1]}H/s`),
			$(".class-average_hashrate").html(`${average_effective[0]} ${average_effective[1]}H/s`),
			$("#reported_hashrate, #reported_hashrate2").html(`<mark class="big">${reported_hashrate[0]}</mark> ${reported_hashrate[1]}H/s`),
			$(".class-reported_hashrate").html(`Reported: ${reported_hashrate[0]} ${reported_hashrate[1]}H/s`),
			valid_shares = data.validShares,
			stale_shares = data.staleShares,
			invalid_shares = data.invalidShares,
			$("#valid_shares, #valid_shares2").html(`<mark class="big">${valid_shares}</mark>`),
			$("#stale_shares, #stale_shares2").html(`<mark class="big">${stale_shares}</mark>`),
			$("#invalid_shares, #invalid_shares2").html(`<mark class="big">${invalid_shares}</mark>`),
			total_shares = valid_shares + stale_shares + invalid_shares,
			total_shares > 0 && (fdata = Math.round(valid_shares / total_shares * 1e4) / 100,
			
			isNaN(fdata) || $("#valid_shares_percentage, #valid_shares_percentage2").html(fdata.toFixed(2)),
			valid_sharesP = fdata = (valid_shares / total_shares * 100) ,
			isNaN(fdata) || $("#valid_shares_percentage_big, #valid_shares_percentage_big2").html(fdata.toFixed(2)),
			stale_sharesP = fdata = (stale_shares / total_shares * 100) ,
			isNaN(fdata) || $("#stale_shares_percentage, #stale_shares_percentage2").html(fdata.toFixed(2)),
			invalid_sharesP = fdata = (invalid_shares / total_shares * 100) ,
			isNaN(fdata) || $("#invalid_shares_percentage, #invalid_shares_percentage2").html(fdata.toFixed(2))),
			
			$(".class-valid_shares").html(`${valid_shares}<span class="class-normal-gray-text valid_shares_percentage">&nbsp;Valid (${valid_sharesP.toFixed(2)}%)</span>`),
			$(".class-stale-invalid-shares").html(`${stale_shares} Stale (${stale_sharesP.toFixed(2)}%) / ${invalid_shares} Invalid (${invalid_sharesP.toFixed(2)}%)</br>`)
		
	}))*/
}

function renderPaymentsData(e) {
	$.get(`https://api.flexpool.io/v2/miner/paymentsStats?coin=eth&address=${window.wallet}`, {}, (function(t) { if (t.result.stats) {
		totalPaid = t.result.stats.totalPaid / Math.pow(10, 18), $(".total-paid").html( /*Math.round*/ ((100 * totalPaid) / 100).toFixed(4)), $(".total-paid-usd").html(formatMoney(totalPaid * e))
	//})).fail((function(e) {
	//	console.error("Unable to get total paid", e)
	//})), $.get(`https://old.flexpool.io/api/v1/miner/${window.wallet}/totalDonated`, {}, (function(t) {
		totalDonated = t.result.stats.totalFees / Math.pow(10, 18), $(".total-donated").html( /*Math.round*/ ((100 * totalDonated) / 100).toFixed(4)), $(".total-donated-usd").html(formatMoney(totalDonated * e))
	//})).fail((function(e) {
	//	console.error("Unable to get total donated", e)
	//})), $.get(`https://old.flexpool.io/api/v1/miner/${window.wallet}/paymentCount`, {}, (function(e) {
		$(".total-payouts").html(t.result.stats.transactionCount)
	} }))
} 

function render_payments(e) {
	renderPagedTable("payments", "https://old.flexpool.io/api/v1/miner/" + window.wallet + "/payments", {}, e, "render_payments", paymentsTableDataFilter)
}

function render_payments_chart() {
	$.get(`https://api.flexpool.io/v2/miner/payments?coin=eth&address=${window.wallet}&page=0`, {}, (function(e) {
		data = e.result.data;
		chart_data = [];
		if (data)
		 data.forEach((function(e, t) {
			chart_data.push([1e3 * e.timestamp, (e.value-e.fee) / Math.pow(10, 18)])
		 })), chart_data.reverse(), renderPayoutChart(chart_data);
	}))
}

function render_rewards_api2_chart() {
	let date
	let bigArray=[]

	$.get('https://api.flexpool.io/v2/miner/rewards?coin=eth&address='+window.wallet, {}, (function(t1) {
		let i=0,l=t1.result.data.length
		for (i=0;i<l;i++) {
			date=new Date(t1.result.data[i].timestamp*1000)
			bigArray.push([new Date(date.getFullYear(),(date.getMonth()),date.getDate(),0).getTime(),(t1.result.data[i].totalRewards/1000000000000000000.0)]);
		}
		date = today = new Date(date.setDate(date.getDate()-1));
		bigArray.push([new Date(date.getFullYear(),(date.getMonth()),date.getDate(),12).getTime(),0])
		bigArray.reverse()
		renderRewardsChart(bigArray,[])

		$("#rewards-chart").highcharts().series[0].remove()
	}));
}

function render_rewards_table_page(page) {
	let fileToLoad='/static/historicData/'+window.wallet+'.js';
$.ajax({
    url:fileToLoad,
    type:'HEAD',
    async: false,
    error: function()
    {

    },
    success: function()
    {
	if (typeof minerHistoricData === 'undefined')    
		load_js(fileToLoad)
	    
	if (typeof minerHistoricData === 'undefined') return;
	    
	let tableTR=
"<tr><td class='narrow'><a class='noglow mono' href='BlockHash1'>BlockNumber</a></td><td class='narrow'>BlockType</td><td class='time'>BlockDate</td><td><a class='noglow mono' href='BlockHash2'>BlockReward<span style='color:var(--accent-color);'>ETH</span></a></td><td><div class='noglow mono'>BlockMEV<span style='color:var(--accent-color);'>ETH</span></div></td><td class='mono'>BlockShare</td><td><div class='noglow mono'>YourReward<span style='color:var(--accent-color);'>ETH</span></div></td><td><div class='noglow mono'>YourMEV<span style='color:var(--accent-color);'>ETH</span></div></td></tr>"
	let tableLines=[]
	let countBlocks=10

	let todayDate = new Date();
	let stringToday = todayDate.getFullYear()+"-"+(todayDate.getMonth() + 1)+"-"+todayDate.getDate();
	    
	for (i=0;i<minerHistoricData.length;i++)
	{
	 let date = new Date(parseInt(minerHistoricData[i].split("|")[0])*1000)
	 let stringDate = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
	 
	 if (i>page*countBlocks && countBlocks>0)// && stringDate!=stringToday)
	 {
	  let newLine=tableTR
	  newLine=newLine.replace('BlockHash1','https://etherscan.io/block/'+minerHistoricData[i].split("|")[1]);
	  newLine=newLine.replace('BlockHash2','https://flexpool.io/block-reward-report/'+minerHistoricData[i].split("|")[1]);
	  if ((minerHistoricData[i].split("|").length - 1)>=7)
	  	newLine=newLine.replace('BlockNumber',minerHistoricData[i].split("|")[7]);
	  else newLine=newLine.replace('BlockNumber',"-");
	  newLine=newLine.replace('BlockType',minerHistoricData[i].split("|")[5]);
	  newLine=newLine.replace('BlockDate',moment(1e3*parseInt(minerHistoricData[i].split("|")[0])).format('D MMM YYYY, HH:mm'));
	  newLine=newLine.replace('BlockReward',(parseFloat(minerHistoricData[i].split("|")[4])/Math.pow(10, 18)).toFixed(2)+' ');
	  if ((minerHistoricData[i].split("|").length - 1)>=8)
	  	newLine=newLine.replace('BlockMEV',(parseFloat(minerHistoricData[i].split("|")[4]-minerHistoricData[i].split("|")[8])/Math.pow(10, 18)).toFixed(4)+' ');
	  else newLine=newLine.replace('BlockMEV',"-");
	  newLine=newLine.replace('BlockShare',parseFloat(minerHistoricData[i].split("|")[2]).toFixed(5)+'%');
	  newLine=newLine.replace('YourReward',parseFloat(minerHistoricData[i].split("|")[3]).toFixed(6)+' ');
	  newLine=newLine.replace('YourMEV',parseFloat(minerHistoricData[i].split("|")[6]).toFixed(6)+' ');
	  tableLines.push(newLine)
	  countBlocks--;
	 }
	}

	$('#rewards-tablebody').html(tableLines.join(""))    


    }
});
	
}

function render_rewards_chart() {
	let fileToLoad='/static/historicData/'+window.wallet+'.js';
$.ajax({
    url:fileToLoad,
    type:'HEAD',
    async: false,
    error: function()
    {

    },
    success: function()
    {
	if (typeof minerHistoricData === 'undefined')    
		load_js(fileToLoad)
	    
	if (typeof minerHistoricData === 'undefined') return;
	    
	let tableTR=
"<tr><td class='narrow'><a class='noglow mono' href='BlockHash1'>BlockNumber</a></td><td class='narrow'>BlockType</td><td class='time'>BlockDate</td><td><a class='noglow mono' href='BlockHash2'>BlockReward<span style='color:var(--accent-color);'>ETH</span></a></td><td><div class='noglow mono'>BlockMEV<span style='color:var(--accent-color);'>ETH</span></div></td><td class='mono'>BlockShare</td><td><div class='noglow mono'>YourReward<span style='color:var(--accent-color);'>ETH</span></div></td><td><div class='noglow mono'>YourMEV<span style='color:var(--accent-color);'>ETH</span></div></td></tr>"
	let tableLines=[]
		
	let bigArray=[]
	let sum = {}
	let bigArrayMEV=[]
	let sumMEV = {}
	let countBlocks=10

	let todayDate = new Date();
	let stringToday = todayDate.getFullYear()+"-"+(todayDate.getMonth() + 1)+"-"+todayDate.getDate();
	    
	for (i=0;i<minerHistoricData.length;i++)
	{
	 let date = new Date(parseInt(minerHistoricData[i].split("|")[0])*1000)
	 let stringDate = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
	 if (sum[stringDate]==undefined) sum[stringDate]=0
	 if (sumMEV[stringDate]==undefined) sumMEV[stringDate]=0
	 sum[stringDate]+=parseFloat(minerHistoricData[i].split("|")[3])
	 sumMEV[stringDate]+=parseFloat(minerHistoricData[i].split("|")[6])
	 
	 if (countBlocks>0)// && stringDate!=stringToday)
	 {
	  let newLine=tableTR
	  newLine=newLine.replace('BlockHash1','https://etherscan.io/block/'+minerHistoricData[i].split("|")[1]);
	  newLine=newLine.replace('BlockHash2','https://flexpool.io/block-reward-report/'+minerHistoricData[i].split("|")[1]);
	  if ((minerHistoricData[i].split("|").length - 1)>=7)
	  	newLine=newLine.replace('BlockNumber',minerHistoricData[i].split("|")[7]);
	  else newLine=newLine.replace('BlockNumber',"-");
	  newLine=newLine.replace('BlockType',minerHistoricData[i].split("|")[5]);
	  newLine=newLine.replace('BlockDate',moment(1e3*parseInt(minerHistoricData[i].split("|")[0])).format('D MMM YYYY, HH:mm'));
	  newLine=newLine.replace('BlockReward',(parseFloat(minerHistoricData[i].split("|")[4])/Math.pow(10, 18)).toFixed(2)+' ');
	  if ((minerHistoricData[i].split("|").length - 1)>=8)
	  	newLine=newLine.replace('BlockMEV',(parseFloat(minerHistoricData[i].split("|")[4]-minerHistoricData[i].split("|")[8])/Math.pow(10, 18)).toFixed(4)+' ');
	  else newLine=newLine.replace('BlockMEV',"-");
	  newLine=newLine.replace('BlockShare',parseFloat(minerHistoricData[i].split("|")[2]).toFixed(5)+'%');
	  newLine=newLine.replace('YourReward',parseFloat(minerHistoricData[i].split("|")[3]).toFixed(6)+' ');
	  newLine=newLine.replace('YourMEV',parseFloat(minerHistoricData[i].split("|")[6]).toFixed(6)+' ');
	  tableLines.push(newLine)
	  countBlocks--;
	 }
	}

	$('#rewards-tablebody').html(tableLines.join(""))    

	let today = new Date
	//bigArray.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),0).getTime(),0])
	//bigArrayMEV.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),0).getTime(),0])
	for (i=0;i<14;i++)
	{
	 today = new Date(today.setDate(today.getDate()))
	 let todayString = today.getFullYear()+"-"+(today.getMonth() + 1)+"-"+today.getDate();
		
	 if (sum[todayString]===undefined) sum[todayString]=0
	 if (sumMEV[todayString]===undefined) sumMEV[todayString]=0
		
	 bigArray.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),0).getTime(),sum[todayString]-sumMEV[todayString]])
	 bigArrayMEV.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),0).getTime(),sumMEV[todayString]])
	 today = new Date(today.setDate(today.getDate()-1))
	}
	//today = new Date(today.setDate(today.getDate()-1))
	bigArray.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),12).getTime(),0])
	bigArrayMEV.push([new Date(today.getFullYear(),(today.getMonth()),today.getDate(),12).getTime(),0])
	bigArray.reverse()
	bigArrayMEV.reverse()
	renderRewardsChart(bigArray,bigArrayMEV)

    }
});

	
}

function renderBlocksData() {
	$.get(`https://old.flexpool.io/api/v1/miner/${window.wallet}/blockCount`, {}, (function(e) {
		if (e.result > 0) {
			$(".nostats").remove()
			$("#blocks").show();
		} else {
			$(".nostats").show();
			$("#blocks").remove()
			$(".nostats").attr('id', 'blocks');
			$("#blocks").show();
		}
		$("#blocks-mined").html(e.result)
	})).fail((function(e) {
		console.error("Unable to load block count", e)
	}))
}

function renderPoolBlocksData() {
	$.get(`https://old.flexpool.io/api/v1/pool/blockCount`, {}, (function(e) {
		$("#blocks-mined").html(e.result.confirmed)
	})).fail((function(e) {
		console.error("Unable to load block count", e)
	}))
}

function renderUncPoolBlocksData() {
	$.get(`https://old.flexpool.io/api/v1/pool/blockCount`, {}, (function(e) {
		$("#blocks-mined").html(e.result.unconfirmed)
	})).fail((function(e) {
		console.error("Unable to load block count", e)
	}))
}

function render_blocks(e) {
	renderPagedTable("blocks", "https://old.flexpool.io/api/v1/miner/" + window.wallet + "/blocks", {}, e, "render_blocks", blocksTableDataFilter)
}

function render_poolblocks(e) {
	renderPagedTable("poolblocks", "https://old.flexpool.io/api/v1/pool/blocks", {
		confirmed: 1
	}, e, "render_poolblocks", poolBlocksTableDataFilter)
}

function render_uncpoolblocks(e) {
	renderPagedTable("uncpoolblocks", "https://old.flexpool.io/api/v1/pool/blocks", {
		confirmed: 0
	}, e, "render_uncpoolblocks", poolBlocksTableDataFilter)
}

function renderGeneral() {
	$("#general").show();
}

function switchViewBlock(e) {
	switch ("stats" != e && $("#worker-header").css({
		height: 0
	}), e) {
		case "blocks":
			/*window.hasLoadedBlocks || */
			(renderBlocksData(), render_blocks(1), window.hasLoadedBlocks = !0)
			break;
		case "poolblocks":
			/*window.hasLoadedPoolBlocks || */
			(renderPoolBlocksData(), render_poolblocks(1), window.hasLoadedPoolBlocks = !0)
			break;
		case "uncpoolblocks":
			/*window.hasLoadedUncPoolBlocks || */
			(renderUncPoolBlocksData(), render_uncpoolblocks(1), window.hasLoadedUncPoolBlocks = !0)
			break;
	}
	$("#" + window.activeBlockView).hide(),
		$("#" + window.activeBlockView + "-selector").removeClass("selector-selected"),
		$("#" + e).show(),
		$("#" + e + "-selector").addClass("selector-selected"),
		window.activeBlockView = e //, 
	//"general" == e ? history.pushState("", document.title, window.location.pathname + window.location.search) 
	//: (window.ignoreHashChange = !0, window.location.hash = "dashboard-" + e)
}

function switchView(e) {
	switch ("stats" != e && $("#worker-header").css({
		height: 0
	}), e) {
		case "stats":
			window.hasLoadedStats || (renderStats(""), window.hasLoadedStats = !0);
			break;
		case "pool":
			window.hasLoadedPool || (renderHashrateChart(), getPoolHashrateData(), renderPoolServerMinedChart(), window.hasLoadedPool = !0);
			break;
		case "rewards":
			window.hasLoadedRewards || (render_rewards_chart()/*, getEthPrice(renderPaymentsData), render_payments(1)*/, window.hasLoadedRewards = !0);
			break;
		case "payouts":
			window.hasLoadedPayouts || (render_payments_chart(), getEthPrice(renderPaymentsData), render_payments(1), window.hasLoadedPayouts = !0);
			break;
		case "showblocks":
			window.hasLoadedShowBlocks || (switchViewBlock('poolblocks'), window.hasLoadedShowBlocks = !0)
			break;
		case "general":
			window.hasLoadedGeneral || (renderGeneral(), window.hasLoadedGeneral = !0)
			break;
	}
	$("#" + window.activeView).hide(),
		$("#" + window.activeView + "-selector").removeClass("selector-selected"),
		$("#" + e).show(),
		$("#" + e + "-selector").addClass("selector-selected"),
		window.activeView = e, "general" == e ? history.pushState("", document.title, window.location.pathname + window.location.search) : (window.ignoreHashChange = !0, window.location.hash = "dashboard-" + e)
}

function renderStatsCharts(e, t, a, s, i, n) {
	$("#hashrates-chart").highcharts({
		chart: {
			styledMode: !0,
			type: "spline"
		},
		title: {
			text: _("Hashrate")
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				month: "%e. %b",
				year: "%b"
			},
			title: {
				text: _("Date")
			}
		},
		yAxis: {
			title: {
				text: _("Hashrates")
			},
			min: 0
		},
		tooltip: {
			headerFormat: "<b>{series.name}</b><br>",
			pointFormat: `{point.x:%e. %b %H:%M}: {point.y:.2f} ${window.chart_hasrate_si}H/s`
		},
		time: {
			timezoneOffset: (new Date).getTimezoneOffset()
		},
		series: [{
			name: _("Effective Hashrate"),
			className: "highcharts-color-effective-hashrate",
			data: highchartsSort(e)
		}, {
			name: _("Reported Hashrate"),
			className: "highcharts-color-reported-hashrate",
			data: highchartsSort(t)
		}, {
			name: _("Average E. Hashrate"),
			className: "highcharts-color-average-effective-hashrate",
			data: highchartsSort(a)
		}]
	}), $("#shares-chart").highcharts({
		chart: {
			styledMode: !0,
			type: "column"
		},
		title: {
			text: _("Shares")
		},
		yAxis: {
			title: {
				text: _("Shares")
			},
			min: 0
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				month: "%e. %b",
				year: "%b"
			},
			title: {
				text: _("Date")
			}
		},
		tooltip: {
			headerFormat: "<b>{series.name}</b><br>",
			pointFormat: "{point.x:%e. %b %H:%M}: {point.y} Shares"
		},
		time: {
			timezoneOffset: (new Date).getTimezoneOffset()
		},
		series: [{
			name: _("Valid shares"),
			className: "highcharts-color-valid-shares",
			data: highchartsSort(s)
		}, {
			name: _("Stale shares"),
			className: "highcharts-color-stale-shares",
			data: highchartsSort(i)
		}, {
			name: _("Invalid shares"),
			className: "highcharts-color-invalid-shares",
			data: highchartsSort(n)
		}]
	})
}

$(window).on('resize', function(){

	if ($("#rewards-chart").highcharts() == undefined) return;
	
	let width=parseInt($('body').css('width').replace('px',''))/(30*($("#rewards-chart").highcharts().series[0].xData.length-1)/14)
	$("#rewards-chart").highcharts().series[0].options.pointWidth=width
	$("#rewards-chart").highcharts().series[0].redraw()
	
	if ($("#rewards-chart").highcharts().series[1] !== undefined) {
		$("#rewards-chart").highcharts().series[1].options.pointWidth=width
		$("#rewards-chart").highcharts().series[1].redraw()
	}

});

function renderRewardsChart(e,f=[]) {
	$("#rewards-chart").highcharts({
		chart: {
			styledMode: !0,
			type: "column"
		},
		title: {
			text: _("Rewards")
		},
		yAxis: {
			title: {
				text: _("Ether")
			},
			min: 0
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				month: "%e. %b",
				year: "%b"
			},
			title: {
				text: _("Date")
			}
		},
		
		plotOptions: {
		       series: {
 			        pointWidth: parseInt($('body').css('width').replace('px',''))/(30*e.length/14)
        	       },
                       column: {
                                stacking: 'normal',
                                borderRadius: 2,
                                //borderWidth: parseInt($('body').css('width').replace('px',''))/60
                       }
                },
		
		tooltip: {
			headerFormat: "<b>{series.name}</b><br>",
			pointFormat: "{point.x:%e. %b}: {point.y:.4f} ETH"
		},
		time: {
			timezoneOffset: (new Date).getTimezoneOffset()
		},
		series: [{
			name: _("MEV"),
			stack: "reward",
			className: "highcharts-color-reported-hashrate",
			data: f
		},{
			name: _("Ether"),
			stack: "reward",
			className: "highcharts-color-payments",
			data: e
		}]
	})
}

function renderPayoutChart(e) {
	$("#payouts-chart").highcharts({
		chart: {
			styledMode: !0,
			type: "column"
		},
		title: {
			text: _("Payments")
		},
		yAxis: {
			title: {
				text: _("Ether")
			},
			min: 0
		},
		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				month: "%e. %b",
				year: "%b"
			},
			title: {
				text: _("Date")
			}
		},
		tooltip: {
			headerFormat: "<b>{series.name}</b><br>",
			pointFormat: "{point.x:%e. %b %H:%M}: {point.y:.4f} ETH"
		},
		time: {
			timezoneOffset: (new Date).getTimezoneOffset()
		},
		series: [{
			name: _("Ether"),
			className: "highcharts-color-payments",
			data: e
		}]		
		
	})
}

function renderPoolServerMinedChart() {
$("#pool-server-mined-chart").highcharts({
		chart: {
			styledMode: !0,
			type: "column"
		},
		title: {
			text: _("Servers")
		},
		yAxis: {
			title: {
				text: _("")
			},
			min: 0
		},
		xAxis: {
            categories: ['Blocks','ETH Mined'],
			title: {
				text: _("")
			}
		},
		
		plotOptions: {
                       column: {
                                borderRadius: 2,
                                //borderWidth: parseInt($('body').css('width').replace('px',''))/60
                       }
                },
		
		tooltip: {
			headerFormat: "<b>{series.name}</b><br>",
			//pointFormat: "{name} {point.y:.4f}"
		},
		time: {
			timezoneOffset: (new Date).getTimezoneOffset()
		},
		series: [{
			name: _("South America"),
			stack: "South America",
			className: "highcharts-color-server-sa",
			data: poolServers['South America']
		},{
			name: _("Australia"),
			stack: "Australia",
			className: "highcharts-color-server-au",
			data: poolServers['Australia']
		},{
			name: _("Asia"),
			stack: "Asia",
			className: "highcharts-color-server-as",
			data: poolServers['Asia']
		},{
			name: _("USA"),
			stack: "USA",
			className: "highcharts-color-server-us",
			data: poolServers['USA']
		},{
			name: _("Europe"),
			stack: "Europe",
			className: "highcharts-color-server-eu",
			data: poolServers['Europe']
		}]
	})
}

function applySettings() {
	err = !1, minPayoutThreshold = $("#settings_min_payout_threshold").val(), maxFeePrice = $("#settings_gas_price_limit").val(), email = $("#settings-email").val(), "" == maxFeePrice && (maxFeePrice = 0), ip = $("#settings-ip").val().replaceAll(" ", ""), validateIP(ip) ? $("#settings-ip").removeClass("invalid-field") : ($("#settings-ip").addClass("invalid-field"), err = !0), err || (modalSettingsDisplayWindow("settings-loading-window"), $.post("/m/api/set_settings", {
		minPayoutThreshold: minPayoutThreshold,
		email: email,
		ip: ip,
		wallet: wallet,
		maxFeePrice: maxFeePrice,
		csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val()
	}, (function(e) {
		"true" == e ? ("" != email && $("#confirmation-sent").show(), modalSettingsDisplayWindow("settings-success-window")) : "Invalid IP" == e ? ($("#settings-ip").addClass("invalid-field"), modalSettingsDisplayWindow("next-step-window")) : ($("#settings-err-msg").html(e), modalSettingsDisplayWindow("settings-error-window"))
	})).fail((function(e) {
		$("#settings-err-msg").html(_("Request failed")), modalSettingsDisplayWindow("settings-error-window")
	})))
}

function nextStepSettings() {
	err = !1, minPayoutThreshold = $("#settings_min_payout_threshold").val(), minPayoutThreshold < .05 || minPayoutThreshold > 100 ? ($("#settings_min_payout_threshold").addClass("invalid-field"), err = !0) : $("#settings_min_payout_threshold").removeClass("invalid-field"), email = $("#settings-email").val(), "" != email && (validateEmail(email) ? $("#settings-email").removeClass("invalid-field") : ($("#settings-email").addClass("invalid-field"), err = !0)), err || modalSettingsDisplayWindow("next-step-window"), $("#settings-ip").select()
}

function openSettings() {
	modalSettingsDisplayWindow("settings-option-window"), bg = $(".settings-modal-bg"), modal = $(".settings-modal"), modal.css({
		"margin-bottom": 200,
		opacity: 0
	}), bg.css({
		opacity: 0
	}), bg.css("visibility", "visible"), modal.animate({
		"margin-bottom": 0,
		opacity: 1
	}, 400), bg.animate({
		opacity: 1
	}), window.settingsOpened = !0
}

function closeSettings() {
	window.settingsOpened = !1, bg = $(".settings-modal-bg"), bg.css("visibility", "hidden"), modal.css({
		opacity: 0
	})
}

function modalSettingsDisplayWindow(e) {
	window.settingsWindows.forEach((function(t, a) {
		t != e && $("#" + t).hide()
	})), $("#" + e).show()
}

function fragmentChanged() {
	if (fragment = window.location.hash.substr(1), "" != fragment || void 0 === window.activeView) switch (fragment) {
		case "dashboard-stats":
			switchView("stats");
			break;
		case "dashboard-pool":
			switchView("pool");
			break;
		case "dashboard-rewards":
			setTimeout(function() { render_rewards_chart(); }, 1500);
			switchView("rewards");
			break;
		case "dashboard-payouts":
			switchView("payouts");
			break;
		case "dashboard-blocks":
			//if (window.isPro) {
			switchView("showblocks");
			break
			//}
			/*case "dashboard-poolblocks":
			        switchView("showblocks");
			        break
			case "dashboard-showblocks":
			        switchView("showblocks");
			        break
			 */
		default:
			switchView("general")
	}
}

function getPoolDonationChallenge(e, t, a) {
	address = window.wallet, $.post("/m/api/get_pool_donation_challenge", {
		address: address,
		donation: e,
		csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val()
	}, (function(e) {
		t(e)
	})).fail((function() {
		a()
	}))
}

function applyPoolDonationChange(e, t, a) {
	e = JSON.stringify(e), $.post("/m/api/apply_pool_donation", {
		sig: e,
		csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val()
	}, (function(e) {
		"OK" == e ? t() : a(e)
	})).fail((function() {
		a("Unknown Error")
	}))
}

function openSettingsEthSigWindow() {
	modalSettingsDisplayWindow("settings-loading-window"), address = window.wallet, $("#settings-donation").removeClass("invalid-field");
	try {
		donation = parseFloat($("#settings-donation").val()) / 100
	} catch {
		return void $("#settings-donation").addClass("invalid-field")
	}
	donation < 0 || donation > 1 ? $("#settings-donation").addClass("invalid-field") : getPoolDonationChallenge(donation, (function(e) {
		$("#settings-ethereum-sign-challenge").val(e), modalSettingsDisplayWindow("settings-sign-window")
	}), (function() {
		$("#settings-err-msg").html('Cannot obtain signing challenge.<br><span class="bluegray">If this happens frequently, please contact us.</span>'), modalSettingsDisplayWindow("settings-error-window")
	}))
}

function inputPoolDonation() {
	modalSettingsDisplayWindow("settings-pool-donation-window"), $("#settings-donation").select()
}

function attemptMetamaskSignature() {
	donation = parseFloat($("#settings-donation").val()) / 100, getPoolDonationChallenge(donation, (function(e) {
		metamaskSign(e, (function(e) {
			applyPoolDonationChange(e, (function() {
				successDonation()
			}), (function(e) {
				alert(e)
			}))
		}))
	}), (function() {
		$("#settings-err-msg").html('Cannot obtain signing challenge.<br><span class="bluegray">If this happens frequently, please contact us.</span>'), modalSettingsDisplayWindow("settings-error-window")
	}))
}

function openESNotice(e) {
	if ("" != $("#settings-donation").val()) {
		if ($("#settings-donation").removeClass("invalid-field"), window.isFreeloader = !1, donation = parseFloat($("#settings-donation").val()), donation < .5) {
			if (!e) return void modalSettingsDisplayWindow("settings-freeloader-notice-window");
			$("#what-is-digital-signature-modal-lower-text").hide(), $("#back-modal-lower-text").show()
		} else $("#back-modal-lower-text").hide(), $("#what-is-digital-signature-modal-lower-text").show();
		modalSettingsDisplayWindow("settings-es-notice-window")
	} else $("#settings-donation").addClass("invalid-field")
}

function metamaskSign(e, t) {
	modalSettingsDisplayWindow("settings-loading-window"), ethereum.enable().then((function(a) {
		if (!a.includes(window.wallet.toLowerCase())) return $("#settings-err-msg").html('<span>Seems like you haven\'t got needed address in metamask.</span><span>Try using <a onclick="openSettingsEthSigWindow();">alternative signing way</a>.</span>'), void modalSettingsDisplayWindow("settings-error-window");
		web3.currentProvider.sendAsync({
			method: "personal_sign",
			params: [e, window.wallet],
			from: window.wallet
		}, (function(a, s) {
			if (a || s.error) return $("#settings-err-msg").html('<span>Metamask error.</span><span>Try using <a onclick="openSettingsEthSigWindow();">alternative signing way</a>.</span>'), void modalSettingsDisplayWindow("settings-error-window");
			data = {
				address: window.wallet.toLowerCase(),
				msg: e,
				sig: s.result
			}, t(data)
		}))
	})).catch((function(e) {
		$("#settings-err-msg").html('<span>Authorization was rejected</span><span>Try using <a onclick="changeSettings(true);">alternative signing way</a>.</span>'), modalSettingsDisplayWindow("settings-error-window")
	}))
}

function changePoolDonation() {
	$("#settings-donation").removeClass("invalid-field"), donation = parseFloat($("#settings-donation").val()) / 100, isNaN(donation) || donation > 1 || donation < 0 ? $("#settings-donation").addClass("invalid-field") : "undefined" != typeof ethereum ? modalSettingsDisplayWindow("settings-metamask-sign-window") : openSettingsEthSigWindow()
}

function openMainMenuWindow() {
	modalSettingsDisplayWindow("settings-option-window")
}

function openDefaultSettingsWindow() {
	modalSettingsDisplayWindow("settings-main-window"), $("#settings_min_payout_threshold").select()
}

function attemptESDonationChange() {
	sig = $("#settings-ethereum-signed-challenge").val(), $("#settings-ethereum-signed-challenge").removeClass("invalid-field");
	try {
		sig = JSON.parse(sig)
	} catch {
		$("#settings-ethereum-signed-challenge").addClass("invalid-field")
	}
	applyPoolDonationChange(sig, (function() {
		successDonation()
	}), (function(e) {
		$("#settings-ethereum-signed-challenge").addClass("invalid-field"), alert(e)
	}))
}

function successDonation() {
	parseFloat($("#settings-donation").val()) > 1 && $("#thx-4-contrib").show(), modalSettingsDisplayWindow("settings-success-window")
}

function sortWorkerStats(e) {
	unordered = {}, num = 0, items = [], order = [], sortType = "", $("#rigstats tbody tr").each((function() {
		sortKey = $($(this).children()[e]).attr("sort-key"), sortType = $($(this).children()[e]).attr("sort-type"), "int" == sortType && (sortKey = parseInt(sortKey)), order.push(sortKey), unordered[sortKey] = $(this).html(), items.push(sortKey), num++
	})), window.unordered = unordered, "int" == sortType ? order = order.sort((function(e, t) {
		return e - t
	})) : order = order.sort(), asc = !0, window.prev_sort_key == e ? (window.prev_sort_key = void 0, asc = !1) : window.prev_sort_key = e, asc && order.reverse(), $("#rigstats thead tr th img").each((function() {
		$(this).removeClass("sort-icon-up"), $(this).removeClass("sort-icon-down"), $(this).addClass("sort-icon")
	})), sortIcon = $("#rigstats thead tr th").children()[e], sortIcon = $(sortIcon, "img"), asc ? (sortIcon.removeClass("sort-icon"), sortIcon.removeClass("sort-icon-up"), sortIcon.addClass("sort-icon-down")) : (sortIcon.removeClass("sort-icon"), sortIcon.removeClass("sort-icon-down"), sortIcon.addClass("sort-icon-up")), allEqual(items) || (out_html = "", window.order = order, order.forEach((function(e) {
		out_html = out_html + "<tr>" + unordered[e] + "</tr>"
	})), $("#rigstats-tbody").html(out_html))
}
async function copyAddress() {
	newSVG = '<svg id="Capa_1" enable-background="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>', elemSVG = $(".account-copy svg"), oldSVG = elemSVG.html(), elemSVG.html(newSVG), elemSVG.html(oldSVG)
}

function reloadOnlyWorker() {
	$.get(`https://api.flexpool.io/v2/miner/workers?coin=eth&address=${window.wallet}`, {}, (function(e) {
	//$('#workers-table tr').remove();
        let htmlToUse=''
	, onlineWorkers = 0
	, offlineWorkers = 0;
	if (e.result)
	e.result.forEach((function(e) {
				e.name = encodeHTML(e.name)
				, workerOffline = !e.isOnline, workerOffline ? offlineWorkers++ : onlineWorkers++
				, classAdditions = ""
				, workerOffline && (classAdditions += "red")
				, htmldata = `<tr><td id="worker-${e.name}" onclick="renderStats('${e.name}');" sort-key="${e.name}" sort-type="str" class="mono ${classAdditions}"><div class="space-between"><span class="worker-name black-underline ${classAdditions}">${e.name}`
				, e.count > 1 && (htmldata += `<span class="bluegray" style="margin-left: 5px;"> (${e.count})</span>`)
				, htmldata += "</span>"
				, htmldata += '</div></td><td class="mono '
				, workerOffline && (htmldata += "bluegray")
				, reportedSi = getSi(e.reportedHashrate)
				, htmldata += `" sort-key="${e.reportedHashrate}" sort-type="int">${Math.round(e.reportedHashrate/reportedSi[0]*10)/10}<span class="bluegray">&nbsp;${reportedSi[1]}H/s</span></td><td class="mono `
				, effectiveSi = getSi(e.currentEffectiveHashrate)
				, lastSeen = Date.now() - 1e3 * e.lastSeen
				, lastSeen < 1e3 ? lastSeenHuman = "now" : lastSeenHuman = formatAgo(humanizeDuration(lastSeen, {
					largest: 1,
					language: LANGUAGE_CODE,
					round: !0
				}))
				, workerOffline && (htmldata += "bluegray")
				, totalShares = e.validShares + e.staleShares + e.invalidShares, htmldata += `" sort-key="${e.currentEffectiveHashrate}" sort-type="int">${Math.round(e.currentEffectiveHashrate/effectiveSi[0]*10)/10}<span class="bluegray">&nbsp;${effectiveSi[1]}H/s</span></td><td sort-key="${e.validShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.validShares}</div><span class="bluegray">(${(e.validShares/totalShares*100).toFixed(2)}%)</span></div></td><td sort-key="${e.staleShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.staleShares}</div><span class="bluegray">(${(e.staleShares/totalShares*100).toFixed(2)}%)</span></div></td><td sort-key="${e.invalidShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.invalidShares}</div><span class="bluegray">(${(e.invalidShares/totalShares*100).toFixed(2)}%)</span></div></td><td id="last-seen-worker-${encodeHTML(e.name)}">${lastSeenHuman}</td></tr>`
				,  htmlToUse = htmlToUse+htmldata//$("#rigstats-tbody").append(htmldata)
			}))
            , $(".online-workers").html(onlineWorkers)
            , $(".offline-workers").html(offlineWorkers)
            , $("#rigstats-tbody").html(htmlToUse)
	}))
}

function reloadData() {
	$("#refreshData").prop("disabled", true);
	$("#refreshData").html("Reloading...");
	$('.nanobar').remove();
	$('#workers-table tr').remove();
	renderStats("");
	render_payments_chart();
	render_blocks(1);
	render_poolblocks(1);
	render_rewards_chart();
	loadEverything();
}

function loadEverything()
{
	    Promise.all([
		$.get("https://api.flexpool.io/v2/pool/averageLuck?coin=eth", {}, (function(l) {
			$("#avgluck").css("display", ""),
			$("#avgluck").html(`<mark class="luck-value">${formatLuck(l.result,true)}</mark>% <mark class="luck-value" style="color:var(--luck-color);padding-left: 10px;">${formatLuck(l.result,false)}</mark>%`),
			$("#avgluck mark").attr("data-luck", l.result)
			//$("#avgroundtime").html(humanizeDuration(1e3 * l.result, { largest: 1, language: LANGUAGE_CODE }))
		}))
	,	$.get("https://api.flexpool.io/v2/pool/blockStatistics?coin=eth", {}, (function(l) {
			$("#block-count").html(l.result.total.blocks + l.result.total.uncles + l.result.total.orphans)
		}))
	,	$.get(`https://api.flexpool.io/v2/pool/currentLuck?coin=eth`, {}, (function(t) {
			$("#current-luck").html(`<span class="luck-value" data-luck="${t.result}">${formatLuck(t.result,/*isPro*/false)}</span>%`);
			$("#currentluck").css("display", "");
			$("#currentluck").html(`<mark class="luck-value">${formatLuck(t.result,true)}</mark>% <mark class="luck-value" style="color:var(--luck-color);padding-left: 10px;">${formatLuck(t.result,false)}</mark>%`);
			$("#currentluck mark").attr("data-luck", t.result);
		}))
	,	$.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=RC1BAJSDTF26J5D3VYHHSZC93XRFTDQKR2`, {}, (function(t) {
			$("#gasPrices").html("")
			let gasPrices="";
			if (t.result.SafeGasPrice == undefined) {
				$.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=4P9URNA4GRJWYV45GW4XE4CZSTXUB41Y5V`, {}, (function(t) {
					if (t.result.SafeGasPrice == undefined) {
						$.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=97P7K57FXX34M489NFZWWKKX4V8EF27RHW`, {}, (function(t) {
							if (t.result.SafeGasPrice == undefined) {} else gasPrices=t.result.SafeGasPrice + " / " + t.result.ProposeGasPrice + " / " + t.result.FastGasPrice;
						}));
					} else gasPrices=t.result.SafeGasPrice + " / " + t.result.ProposeGasPrice + " / " + t.result.FastGasPrice;
				}));
			} else gasPrices=t.result.SafeGasPrice + " / " + t.result.ProposeGasPrice + " / " + t.result.FastGasPrice;
			$("#gasPrices").html(gasPrices);
			$(".class-gasPrices").html("Gas Prices: "+gasPrices);
		}))
	
	,	$.get(`https://api.flexpool.io/v2/miner/stats?coin=eth&address=${window.wallet}`, {}, (function(e) {
		        let valid_sharesP=0;let invalid_sharesP=0;let stale_sharesP=0;
			data = e.result,
			effective_hashrate = sif(data.currentEffectiveHashrate),
			average_effective = sif(data.averageEffectiveHashrate),
			reported_hashrate = sif(data.reportedHashrate),
			$("#effective_hashrate, #effective_hashrate2").html(`<mark class="big">${effective_hashrate[0]}</mark> ${effective_hashrate[1]}H/s`),
			$(".class-effective_hashrate").html(`Current: ${effective_hashrate[0]} ${effective_hashrate[1]}H/s`),
			$("#average_hashrate, #average_hashrate2").html(`<mark class="big">${average_effective[0]}</mark> ${average_effective[1]}H/s`),
			$(".class-average_hashrate").html(`${average_effective[0]} ${average_effective[1]}H/s`),
			$("#reported_hashrate, #reported_hashrate2").html(`<mark class="big">${reported_hashrate[0]}</mark> ${reported_hashrate[1]}H/s`),
			$(".class-reported_hashrate").html(`Reported: ${reported_hashrate[0]} ${reported_hashrate[1]}H/s`),
			valid_shares = data.validShares,
			stale_shares = data.staleShares,
			invalid_shares = data.invalidShares,
			$("#valid_shares, #valid_shares2").html(`<mark class="big">${valid_shares}</mark>`),
			$("#stale_shares, #stale_shares2").html(`<mark class="big">${stale_shares}</mark>`),
			$("#invalid_shares, #invalid_shares2").html(`<mark class="big">${invalid_shares}</mark>`),
			total_shares = valid_shares + stale_shares + invalid_shares,
			total_shares > 0 && (fdata = Math.round(valid_shares / total_shares * 1e4) / 100,
			
			isNaN(fdata) || $("#valid_shares_percentage, #valid_shares_percentage2").html(fdata.toFixed(2)),
			valid_sharesP = fdata = (valid_shares / total_shares * 100) ,
			isNaN(fdata) || $("#valid_shares_percentage_big, #valid_shares_percentage_big2").html(fdata.toFixed(2)),
			stale_sharesP = fdata = (stale_shares / total_shares * 100) ,
			isNaN(fdata) || $("#stale_shares_percentage, #stale_shares_percentage2").html(fdata.toFixed(2)),
			invalid_sharesP = fdata = (invalid_shares / total_shares * 100) ,
			isNaN(fdata) || $("#invalid_shares_percentage, #invalid_shares_percentage2").html(fdata.toFixed(2))),
			
			$(".class-valid_shares").html(`${valid_shares}<span class="class-normal-gray-text valid_shares_percentage">&nbsp;Valid (${valid_sharesP.toFixed(2)}%)</span>`),
			$(".class-stale-invalid-shares").html(`${stale_shares} Stale (${stale_sharesP.toFixed(2)}%) / ${invalid_shares} Invalid (${invalid_sharesP.toFixed(2)}%)</br>`)
		}))
	
	,   $.get(`https://api.flexpool.io/v2/miner/workers?coin=eth&address=${window.wallet}`, {}, (function(e) {
			let htmlToUse=''
			, onlineWorkers = 0
			, offlineWorkers = 0;
		        if (e.result)
			e.result.forEach((function(e) {
				e.name = encodeHTML(e.name)
				, workerOffline = !e.isOnline, workerOffline ? offlineWorkers++ : onlineWorkers++
				, classAdditions = ""
				, workerOffline && (classAdditions += "red")
				, htmldata = `<tr><td id="worker-${e.name}" onclick="renderStats('${e.name}');" sort-key="${e.name}" sort-type="str" class="mono ${classAdditions}"><div class="space-between"><span class="worker-name black-underline ${classAdditions}">${e.name}`
				, e.count > 1 && (htmldata += `<span class="bluegray" style="margin-left: 5px;"> (${e.count})</span>`)
				, htmldata += "</span>"
				, htmldata += '</div></td><td class="mono '
				, workerOffline && (htmldata += "bluegray")
				, reportedSi = getSi(e.reportedHashrate)
				, htmldata += `" sort-key="${e.reportedHashrate}" sort-type="int">${Math.round(e.reportedHashrate/reportedSi[0]*10)/10}<span class="bluegray">&nbsp;${reportedSi[1]}H/s</span></td><td class="mono `
				, effectiveSi = getSi(e.currentEffectiveHashrate)
				, lastSeen = Date.now() - 1e3 * e.lastSeen
				, lastSeen < 1e3 ? lastSeenHuman = "now" : lastSeenHuman = formatAgo(humanizeDuration(lastSeen, {
					largest: 1,
					language: LANGUAGE_CODE,
					round: !0
				}))
				, workerOffline && (htmldata += "bluegray")
				, totalShares = e.validShares + e.staleShares + e.invalidShares, htmldata += `" sort-key="${e.currentEffectiveHashrate}" sort-type="int">${Math.round(e.currentEffectiveHashrate/effectiveSi[0]*10)/10}<span class="bluegray">&nbsp;${effectiveSi[1]}H/s</span></td><td sort-key="${e.validShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.validShares}</div><span class="bluegray">(${(e.validShares/totalShares*100).toFixed(2)}%)</span></div></td><td sort-key="${e.staleShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.staleShares}</div><span class="bluegray">(${(e.staleShares/totalShares*100).toFixed(2)}%)</span></div></td><td sort-key="${e.invalidShares}" sort-type="int" class="mono"><div class="shares-item"><div>${e.invalidShares}</div><span class="bluegray">(${(e.invalidShares/totalShares*100).toFixed(2)}%)</span></div></td><td id="last-seen-worker-${encodeHTML(e.name)}">${lastSeenHuman}</td></tr>`
				,  htmlToUse = htmlToUse+htmldata//$("#rigstats-tbody").append(htmldata)
			}))
            , $(".online-workers").html(onlineWorkers)
            , $(".offline-workers").html(offlineWorkers)
            , $("#rigstats-tbody").html(htmlToUse)
			, $(".class-online-offline-workers").html(onlineWorkers+'/<span class="class-alternative-text-color">'+offlineWorkers+'</span>')
		}))
		
	])
	.then(([]) => { });
		    
		    
    Promise.all([
		//$.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=" + ((window.currency == undefined || window.currency == "") ? "usd" : window.currency), {}, (function(r) { window.ethPrice = r.ethereum[Object.keys(r.ethereum)[0]] }))
		$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/miner/paymentsStats?coin=eth&address=${window.wallet}`, success: function(r) { window.ethPrice=r.result.price } })
	,	$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/miner/balance?coin=eth&address=${window.wallet}&countervalue=`+((window.currency == undefined || window.currency == "") ? "usd" : window.currency), success: function(r) {} })
	,	$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/miner/roundShare?coin=eth&address=${window.wallet}`, success: function(r) {} })
	,	$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/pool/blocks?coin=eth&page=0`, success: function(r) {} })
	,	$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/pool/hashrate?coin=eth`, success: function(r) {} })
	,	$.ajax({type: 'GET', url: `https://api.flexpool.io/v2/miner/details?coin=eth&address=${window.wallet}`, success: function(r) {} })
	])
	.then(([
	//	ethCurrentValue
		walletTotalPaid
	,	walletBalance
	,	walletRoundShare
	,	blockPageZero
	,	poolHashrate
	,	walletDetails
	]) => {
		//ethCurrentValue=window.ethPrice;
	        ethCurrentValue=walletBalance.result.price;
		let totalPaidUntreated=walletTotalPaid.result.stats.totalPaid;
		let currentBalanceUntreated=walletBalance.result.balance;
		let roundSharePercentage=walletRoundShare.result;
		let lastBlockDifficulty=blockPageZero.result.data[0].difficulty;
		let poolTotalHashrate=poolHashrate.result.total;
		let minPayoutThreshold=walletDetails.result.payoutLimit/1000000000000000000.0;
		let firstJoined=walletDetails.result.firstJoined;
		let poolDonation=0.005;//walletDetails.result.pool_donation;
		let maxFeePrice=walletDetails.result.maxFeePrice;
		
		$("#currentGasSettings").html(maxFeePrice);
		$(".class-currentGasSettings").html(maxFeePrice+" Gwei");

		let cookieTheme=document.cookie.split("theme='")
			if (cookieTheme !== undefined && cookieTheme.length>1)
				cookieTheme=cookieTheme[1].split("'")[0];
		else
			cookieTheme='dark';
		let rank = applyPoolDonation(poolDonation,cookieTheme);
		
		let USD = '<div style="margin-left: 6px;" class="currencyString">USD</div>';
				
		$(".account-rank").html(rank[0]);
		$(".account-rank").addClass("rank-" + rank[1]);
		$(".pool-donation").html(`<mark>${Math.round(100*poolDonation*100)/100}%</mark>`);
		$(".class-pool-donation").html(`Pool Donation: ${Math.round(100*poolDonation*100)/100}%`);
		$(".min-payout-threshold").html(`<mark>${Math.round(minPayoutThreshold*100)/100} ETH</mark>`);
		$(".class-min-payout-threshold").html(`<div>${Math.round(minPayoutThreshold*100)/100} ETH</div>`);
		$(".first-joined").html(`<mark>${formatAgo(humanizeDuration(Date.now()-1e3*firstJoined,{largest:1,language:LANGUAGE_CODE}))}</mark>`);
		$(".class-first-joined").html(`Joined: ${formatAgo(humanizeDuration(Date.now()-1e3*firstJoined,{largest:1,language:LANGUAGE_CODE}))}`);
		

		let totalPaidBalance=(totalPaidUntreated > 0) ? totalPaidUntreated / Math.pow(10, 18) : 0;
		$("#totalPaidBalance").html((Math.round(1e7 * totalPaidBalance) / 1e7).toFixed(6));
		$("#totalPaidBalance-usd").html(formatMoney(totalPaidBalance * ethCurrentValue));
		
		let currentBalance=(currentBalanceUntreated > 0) ? currentBalanceUntreated / Math.pow(10, 18) : 0;
		$("#totalPaidBalanceUnpaid").html((Math.round(1e7 * (currentBalance + totalPaidBalance)) / 1e7).toFixed(6));
		$("#totalPaidBalanceUnpaid-usd").html(formatMoney((currentBalance + totalPaidBalance) * ethCurrentValue));
		
		$("#balance").html((Math.round(1e7 * currentBalance) / 1e7).toFixed(6));
		$(".class-unpaid-balance").html((Math.round(1e7 * currentBalance) / 1e7).toFixed(6)+" ETH");
		$("#balance-usd").html(formatMoneyCents(formatMoney(currentBalance * ethCurrentValue)));
		$(".class-unpaid-balance-usd").html("≈ "+formatMoneyCents(formatMoney(currentBalance * ethCurrentValue))+USD);
		
		$("#currentETHPrice").html(ethCurrentValue.toFixed(2));
		
		$("#ethdifficulty").html((lastBlockDifficulty/1000000000000000).toFixed(2)+' P');
		$(".class-ethdifficulty").html("ETH Difficulty: "+(lastBlockDifficulty/1000000000000000).toFixed(2)+' P');
		$(".workerWindowStat3").show();
		let blockPerMinute = ((lastBlockDifficulty / poolTotalHashrate) / 60).toFixed(1);
		let blockPerDay = ((60 / blockPerMinute) * 24).toFixed(1);
		$("#blocksPerMinute").html(blockPerMinute + " mins");
		$("#blocksPerDay").html(blockPerDay);
		$("#poolHashrate, .class-poolHashrate").html((poolTotalHashrate / 1000000000000).toFixed(3) + " TH/s");
		
		let sumBlock = {}
		let count = {}
		
		for (i=0;i<lastBlocksData.length;i++)
		{
			let date = new Date(parseInt(lastBlocksData[i].split("|")[0])*1000);
			let stringDate = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
			if (sumBlock[stringDate] == undefined) sumBlock[stringDate]=0;
			sumBlock[stringDate]=sumBlock[stringDate]+parseFloat(lastBlocksData[i].split("|")[2]);
			if (count[stringDate] == undefined) count[stringDate]=0;
			count[stringDate]=count[stringDate]+1;
		}
		
		let newDate = new Date();
		let timesToSum = 3;
		let sumCountBlock = 0;
		let sumEntireBlock = 0;
		for (i=0;i<timesToSum;i++)
		{
			newDate=new Date(newDate.setDate(newDate.getDate() - 1));
			let stringNewDate = newDate.getFullYear()+"-"+(newDate.getMonth() + 1)+"-"+newDate.getDate();
			sumCountBlock+=parseFloat(count[stringNewDate] || 0);
			sumEntireBlock+=parseFloat(sumBlock[stringNewDate] || 0);
		}
		let averageBlockReward=(sumEntireBlock/sumCountBlock)/1000000000000000000.0;
		let blockShare=parseFloat(Math.round(100 * roundSharePercentage * 1e4) / 1e4);
		let averageBlockEarnings=averageBlockReward*(blockShare/100);
		let averageDailyEarnings=averageBlockEarnings*blockPerDay;
		
		let approxnextblockreward = "" + (averageBlockEarnings).toFixed(7 - (averageBlockEarnings).countDecimals());
		let approxnextdailytreward = "" + (averageDailyEarnings).toFixed(7 - (averageDailyEarnings).countDecimals());
		let approxnextweeklytreward = "" + ((averageDailyEarnings*7)).toFixed(7 - ((averageDailyEarnings*7)).countDecimals());
		let approxnextmonthlytreward = "" + ((averageDailyEarnings*30)).toFixed(7 - ((averageDailyEarnings*30)).countDecimals());
		
		$(".class-approx-next-block-reward2").html("Appr.Rew.: "+(averageBlockEarnings).toFixed(7 - (averageBlockEarnings).countDecimals())+" ETH");
		$("#approx-next-block-reward, .class-approx-next-block-reward").html(approxnextblockreward)
		$("#approx-daily-reward, .class-approx-next-daily-reward").html(approxnextdailytreward)
		$("#approx-weekly-reward, .class-approx-next-weekly-reward").html(approxnextweeklytreward)
		$("#approx-monthly-reward, .class-approx-next-monthly-reward").html(approxnextmonthlytreward)
		
		$("#approx-next-block-reward-usd, .class-approx-next-block-reward-usd").html(formatMoney(parseFloat(approxnextblockreward) * ethCurrentValue))
		$("#approx-daily-reward-usd, .class-approx-next-daily-reward-usd").html(formatMoney(parseFloat(approxnextdailytreward) * ethCurrentValue))
		$("#approx-weekly-reward-usd, .class-approx-next-weekly-reward-usd").html(formatMoney(parseFloat(approxnextweeklytreward) * ethCurrentValue))
		$("#approx-monthly-reward-usd, .class-approx-next-monthly-reward-usd").html(formatMoney(parseFloat(approxnextmonthlytreward) * ethCurrentValue))
		
		
		$('.nanobar').remove();
		let payoutPercentage = currentBalance / minPayoutThreshold * 100;
		if (payoutPercentage >= 100) payoutPercentage=100;
        let timeToGetPaid = '<div class="gray" id="timeToGetPaid" style="text-align: center;font-size: 14px;color: gray;position: absolute;width: 100%;top: -18px;"></div>';
        let payoutBar = '<div class="nanobar" style="position: relative;"><div class="bar" style="width: '+payoutPercentage+'%;"></div></div>';
        $('#payout-bar').html(payoutBar+timeToGetPaid);
		if (payoutPercentage >= 100) {
			$("#payout-bar").addClass("green");
			$("#timeToGetPaid").html("");
			$("#tooltip-balance-bar").html(_("100% of payout limit reached.<br>You will be paid in the next payment round."));
			payoutPercentage = 99.99999999;
		}
		else {
            payoutETA = (minPayoutThreshold - currentBalance) / averageDailyEarnings * 86400;
			$(".class-porcentage-reached").html(String(Math.round(payoutPercentage))+'% Reached');
			$("#timeToGetPaid, .class-timeToGetPaid").html(humanizeDuration(1e3 * payoutETA, { units: ["d", "h", "m"], maxDecimalPoints: 2, language: LANGUAGE_CODE }) );
			$("#tooltip-balance-bar").html(String(Math.round(payoutPercentage))
			+ "% " + _("of payout limit reached.<br>Payout limit would be reached in")
			+ " " + humanizeDuration(1e3 * payoutETA, { units: ["d", "h", "m"], maxDecimalPoints: 2, language: LANGUAGE_CODE }) + ".");
		}
		$(".payout-percentage").html(Math.round(payoutPercentage));
		$("#round-share-percent, .class-round-share-percent").html(Math.round(100 * roundSharePercentage * 1e4) / 1e4 + "%");
		
		{
			let currentTime = new Date();
			let currentDay = String(currentTime.getDate()).padStart(2, '0'),
				day = String(currentTime.getDate()).padStart(2, '0'),
				currentHour = currentTime.getHours(),
				count = 0,
				countToday = 0,
				countTodayUncle = 0,
				count24 = 0,
				count24Uncle = 0,
				luck = 0,
				effort = 0,
				hours = 0,
				gotBlockNumber = false,
				lastBlockTime = new Date(),
				gotLastBlockTime = false,
				reward24 = 0,
				rewardToday = 0,
				unconfirmed = 0,
				unconfirmedReward = 0;
	
			let j=0, lastBlocksArray=[], maxNumber=0
			for (j=0;j<lastBlocksData.length;j++)
			{
				let tempArray=lastBlocksData[j].split("|"), tempDict={}
				tempDict["timestamp"]=tempArray[0]
				tempDict["total_rewards"]=tempArray[2]
				tempDict["type"]=tempArray[3]
				tempDict["number"]=tempArray[4]
				tempDict["luck"]=tempArray[6].split(',')[0]
				tempDict["confirmed"]=true
				maxNumber=Math.max(maxNumber,parseInt(tempArray[4]))
				lastBlocksArray.push(tempDict)
			}
	
			do { 
				$.ajax({
					async: false,
					type: 'GET',
					url: 'https://api.flexpool.io/v2/pool/blocks?coin=eth&page=' + count,
					success: function(t1) {
						count = count + 1;
						let l = t1.result.data.length,
							i = 0;
						for (i = 0; i < l; i++) if (!gotBlockNumber) {
							if (t1.result.data[i].number>maxNumber) {
								let tempDict={}
								tempDict["timestamp"]=t1.result.data[i].timestamp
								tempDict["total_rewards"]=t1.result.data[i].reward
								tempDict["type"]=t1.result.data[i].type
								tempDict["number"]=t1.result.data[i].number
								tempDict["luck"]=t1.result.data[i].luck
								tempDict["confirmed"]=t1.result.data[i].confirmed
								lastBlocksArray.push(tempDict)
							}
							else {
								gotBlockNumber=true;
							}
							let date = new Date(t1.result.data[i].timestamp * 1000);
							if (gotLastBlockTime == false) {
								gotLastBlockTime = true;
								lastBlockTime = lastBlockTime.getTime() - date.getTime();
							}
							day = String(date.getDate()).padStart(2, '0');
							hours = Math.abs(currentTime - date) / 36e5;
						}
					}
				});
			} while (hours < 24 && !gotBlockNumber);
			
			for (i=0;i<lastBlocksArray.length;i++)
			{
			let date = new Date(lastBlocksArray[i]['timestamp'] * 1000);
			day = String(date.getDate()).padStart(2, '0');
			hours = Math.abs(currentTime - date) / 36e5;
	
			if (currentDay == day) {
				countToday = countToday + 1;
				rewardToday = rewardToday + (Math.round(lastBlocksArray[i]['total_rewards'] / Math.pow(10, 18) * 100) / 100);
			}
			if (currentDay == day && lastBlocksArray[i]['type'] == "uncle") countTodayUncle = countTodayUncle + 1;
			if (hours < 24) {
				count24 = count24 + 1;
				effort = effort + formatLuck(lastBlocksArray[i]['luck'], true);
				luck = luck + formatLuck(lastBlocksArray[i]['luck'], false);
				reward24 = reward24 + (Math.round(lastBlocksArray[i]['total_rewards'] / Math.pow(10, 18) * 100) / 100);
			}
			if (hours < 24 && lastBlocksArray[i]['type'] == "uncle") {
				count24Uncle = count24Uncle + 1;
			}
			if (lastBlocksArray[i]['confirmed'] == false) {
				unconfirmed = unconfirmed + 1;
				unconfirmedReward = unconfirmedReward + (Math.round(lastBlocksArray[i]['total_rewards'] / Math.pow(10, 18) * 100) / 100) * (Math.round(100 * roundSharePercentage * 1e4) / 1e4) / 100;
			}
			}
	
			effort = effort / count24;
			luck = (100 / effort) * 100;
			$("#avgluck24").css("display","");
			$("#avgluck24").html('<mark class="luck-value">' + effort.toFixed(0) + '</mark>% <mark class="luck-value" style="color:var(--luck-color);padding-left: 10px;">' + luck.toFixed(0) + '</mark>%');
			$("#blocksLast24").html(count24 + "<mark style='color:var(--problem-color);font-size: 24px;padding-left: 4px;'>" + count24Uncle + "</mark> / " + countToday + "<mark style='color:var(--problem-color);font-size: 24px;padding-left: 4px;'>" + countTodayUncle + "</mark>");
			$("#minedETH").html(reward24.toFixed(1) + " / " + rewardToday.toFixed(1));
			$("#unconfirmedBalance").html(unconfirmedReward.toFixed(6));
			if (unconfirmed > 0) {
				$("#unconfirmedBalContainer").show();
				$("#unconfirmedBalanceTitle").html('Unconfirmed Balance*: ' + unconfirmed + ` ${unconfirmed > 1 ? "blocks" : "block"}`);
			} else {
				$("#unconfirmedBalContainer").hide();
			}
			$("#unconfirmedBalance-usd").html(formatMoney(unconfirmedReward * ethCurrentValue));
			if (lastBlockTime < 3600000)
				$("#timeSinceLastBlock").html(humanizeDuration(lastBlockTime, { units: ["m"], maxDecimalPoints: 1, language: LANGUAGE_CODE }));
			else
				$("#timeSinceLastBlock").html(humanizeDuration(lastBlockTime, { units: ["h"], maxDecimalPoints: 2, language: LANGUAGE_CODE }));
		}
		
		$("#refreshData").prop("disabled", false);
		$("#refreshData").html("Reload");
		//console.log('done')
	});
}

function applyPoolDonation(e, t) { //colors: hero-rainbow, hero, brown, vip, yellow, freeloader, vip, mvp, loyalminer
	switch (window.wallet){
		case "0xe3F0E64a57223c70651E03Fca2a58cA03f370c46":
			return ["Gostosa", "glowText"];//"yellow"];
		case "0xC8366d03F3F88cc0769efDa34B241f4eEDD11E36":
			return ["Maker", "glowText"];
		case "0x93e13BBbA612aB6b38277994e1D0EB87A70a6Ac3":
			$('.account-rank').css('position','absolute')
			$('.account-rank').css('margin-top','-6px')
			$('.account-rank').css('margin-left','8px')
			$('.account-rank').parent().parent().css('margin-top','')
			$('.account-rank').parent().parent().css('width','280px')
			$('.min-payout-threshold').parent().hide()
			return ["CLINTON SUCKS", "glowText"];
	}
	switch (t){
		case 'doge':
			return ["Doggo", "glowText"];//"hero-rainbow"];
		case 'elon':
			return ["Rocket", "glowText"];//"hero-rainbow"];
		case 'elon2':
			return ["Space", "glowText"];//"hero-rainbow"];
		case 'boomer':
			return ["Boomer", "glowText"];//"hero-rainbow"];
		case 'gb':
			return ["Gamer", "glowText"];//"hero-rainbow"];
		case 'teameurope':
		case 'teameurope2':
		case 'beta':
		case 'chocolate':
		case 'chocolate2':
		case 'spacecat':
		case 'thudder':
		default:
			return ["Hero", "glowText"];//"hero-rainbow"];
	}
}

var reloadTimer = 0
var startCountdown = 0
var workerTimer = setInterval(reloadOnlyWorker, 30000);

$(".settings-modal-bg").click((function() {
	$(".settings-modal").data("hover") || closeSettings()
})), $(document).keyup((function(e) {
	window.settingsOpened && "input" != document.activeElement.tagName.toLowerCase() && 27 == e.which && closeSettings()
})), $(document).ready((function() {
	Highcharts.setOptions({
		colors: ["#0069ff", "#2c3e50", "#3498db"]
	}), window.settingsOpened = !1, window.settingsWindows = ["settings-main-window", "next-step-window", "settings-loading-window", "settings-success-window", "settings-error-window", "settings-option-window", "settings-metamask-sign-window", "settings-sign-window", "settings-pool-donation-window", "settings-es-notice-window", "settings-freeloader-notice-window"], $("#stats").css({
		visibility: "visible",
		display: "none"
	}), fragmentChanged(), $("#worker-search").trigger("input"), renderHeader(""), window.changeAddressWidthPrevMobile = !1, window.hasEmailUpdated = !1
})), $(window).on("hashchange", (function() {
	window.ignoreHashChange ? window.ignoreHashChange = !1 : fragmentChanged()
})), $("#rigstats thead th.sorted").click((function() {
	sortWorkerStats($(this).index()), $("#worker-search").trigger("input")
})), $("#worker-search").on("input", (function() {
	input = $("#worker-search").val(), trs = $("#rigstats tbody tr"), trs_displayed = [], trs.each((function(e) {
		$(this).removeClass("noborderbottom"), child = $($(this).children()[0]), val = child.attr("sort-key"), val.toLowerCase().includes(input.toLowerCase()) ? ($(this).show(), trs_displayed.push($(this))) : $(this).hide()
	})), last_tr_displayed = trs_displayed[trs_displayed.length - 1], "undefined" != typeof last_tr_displayed && last_tr_displayed.addClass("noborderbottom")
})), $(".hover-tooltip").on({
	mouseenter: function() {
		tooltip = $(this).parent().find(".tooltip"), tooltip.css("visibility", "visible"), tooltip.css({
			opacity: 1
		})
	},
	mouseleave: async function() {
		tooltip = $(this).parent().find(".tooltip"), tooltip.parent().find(".tooltip").css({
			opacity: 0
		}), await sleep(200), tooltip.css("visibility", "hidden")
	}
}), $(".account-copy").click((async function() {
	for (newSVG = '<svg id="Capa_1" enable-background="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>', elemSVG = $(".account-copy svg"), tooltip = $(".copy-tooltip"), oldSVG = elemSVG.html(), elemSVG.html(newSVG), tooltipOldText = tooltip.html(), addressTextArea = document.getElementById("wallet-textarea-for-copy"), addressTextArea.select(), addressTextArea.setSelectionRange(0, 999999), document.execCommand("copy"), copyToClipboard(window.wallet), tooltip.html("Copied!"); $(".account-copy").is(":hover");) await sleep(100);
	await sleep(300), elemSVG.html(oldSVG), await sleep(200), tooltip.html(tooltipOldText)
})), Array.prototype.remove = function() {
	for (var e, t, a = arguments, s = a.length; s && this.length;)
		for (e = a[--s]; - 1 !== (t = this.indexOf(e));) this.splice(t, 1);
	return this
}, search_history = localStorage.getItem("autocompleteSearchHistory"), null != search_history ? (search_history = JSON.parse(search_history), search_history.remove(window.wallet), search_history = [window.wallet].concat(search_history), search_history.length > 3 && search_history.pop()) : search_history = [window.wallet], localStorage.setItem("autocompleteSearchHistory", JSON.stringify(search_history)), $("body").on("keydown", (function(e) {
	if (!window.settingsOpened && !$("input#worker-search").is(":focus")) switch (e.keyCode) {
		case 83:
			switchView("stats");
			break;
		case 80:
			switchView("payouts");
			break;
		case 66:
			switchView("showblocks")
	}
})), $(".settings-modal-bg").click((async function() {
	window.settingsOpened && (window.settingsModalClicked ? window.settingsModalClicked = !1 : closeSettings())
})), $(".settings-modal").click((function() {
	window.settingsModalClicked = !0
})), tenMidModInit = Date.now() / 1e3 % 600, loadEverything()/*loadData()*/, $("#settings-ip").on("keydown", (function(e) {
	13 == e.which && applySettings()
})), $("#settings_min_payout_threshold").on("keydown", (function(e) {
	13 == e.which && $("#settings_gas_price_limit").select()
})), $("#settings_gas_price_limit").on("keydown", (function(e) {
	13 == e.which && $("#settings-email").select()
})), $("#settings-email").on("keydown", (function(e) {
	13 == e.which && nextStepSettings()
})), $("#settings-donation").on("keydown", (function(e) {
	13 == e.which && openESNotice()
})), window.workerUpdates = {};
//let workerUpdateWebsocket = new WebSocket(window.location.protocol.replace("http", "ws") + "//" + window.location.host + "/api/v1/ws/worker-ws/" + window.wallet + "/");
//let workerUpdateWebsocket = new WebSocket("ws://old.flexpool.io/api/v1/ws/worker-ws/" + window.wallet + "/");
async function workerUpdater() {
	for (;;) {
		for (worker in window.workerUpdates) lastSeen = Date.now() - window.workerUpdates[worker], lastSeen < 1e3 ? lastSeenHuman = _("now") : lastSeenHuman = formatAgo(humanizeDuration(lastSeen, {
			largest: 1,
			language: LANGUAGE_CODE,
			round: !0
		})), $(`#last-seen-worker-${worker}`).html(lastSeenHuman);
		await sleep(100)
	}
}
var mixThemes = 0
//workerUpdateWebsocket.onmessage = function(e) {
//    for (key in msgJSON = JSON.parse(e.data), msgJSON) window.workerUpdates[key] = msgJSON[key]
//}, workerUpdater();
