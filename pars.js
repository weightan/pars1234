

//document.getElementsByClassName('dotted_button MoreToPage')[0].click()

//pollVote(5902, 0);
//pftake('/section_message_post.php?action=poll_show_voters&poll_id=5902', 1, 'poll_5902_show_voters', '<img src=/images/load_2.gif>');

//console.log(elements[0].getElementsByClassName('PollVoteFormContainer')[0].id.slice(5,20))

function isEmpty (value) {
  return (
    // null or undefined
    (value == null) ||

    // has length and it's zero
    (value.hasOwnProperty('length') && value.length === 0) ||

    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  )
}

for (let i = 0; i < 2; i++) {
    document.getElementById('MessagesNext').lastElementChild.click()
    await new Promise(r => setTimeout(r, 120));
}


let elements = document.getElementsByClassName('Message')
for (let i = 0; i < elements.length; i++) {
    let t_id = elements[i].getElementsByClassName('PollVoteFormContainer')[0]
    if (t_id != null){
        let t_n = parseInt(t_id.id.slice(5,20))
        eval(`pollVote(${t_n}, 0);pftake('/section_message_post.php?action=poll_show_voters&poll_id=${t_n}', 1, 'poll_${t_n}_show_voters', '<img src=/images/load_2.gif>');`)
        await new Promise(r => setTimeout(r, 120));
    }
}

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}


let obj = {
   table: []
};

for (let i = 0; i < elements.length; i++) {
    let data1  = elements[i].getElementsByClassName('MessageHead')[0].innerText;
    let text1  = elements[i].getElementsByClassName('MessageText')[0].innerText;

    let p_test = elements[i].getElementsByClassName('PollVoteFormContainer')
    let poll1 =  '';

    if (!isEmpty(p_test[0])){
        poll1 = p_test[0].innerText;
        if(poll1.includes("Публичный опрос")) obj.table.push({data: data1, text: text1, poll:poll1});
    }
}

console.save(obj, 't1.json')