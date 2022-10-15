let data ;

function getData(){
    let count = 0;
    
    fetch("https://script.google.com/macros/s/AKfycbxAojM-kiEXy4wtWR2AD9WjV5b_vvYbwsWMgHEsjMD4idNeLphXp63DPWq79usTAGtqjg/exec",
    {method:'GET'} ,
    (response)=>{
        // console.log("res" , response)
        return response.text()
    }).then((out)=>{
        
        document.getElementById("fetching").style.display = "none"
        out.text().then((text)=>{
            data = JSON.parse(text)

            for(year in data){
                document.getElementById("yearlist").innerHTML += 
                `<li class="nav-item first mbr-fonts-style"><a
                class="nav-link mbr-fonts-style show display-7 ${count==0 ? 'active' : ''} " role="tab" data-toggle="tab"
                data-bs-toggle="tab" href="#tabs1-1m_tab${year}" onclick=toggleyear('tab${year}')
                aria-selected="true"><strong>${year}</strong></a></li>`
                document.getElementById("tab-content").innerHTML += `
                <div id="tab${year}" class="tab-pane ${count==0 ? 'in active' : ''} " role="tabpanel">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="tags_${year}" class="tags"></div>
                                <table>
                    <thead>
                        <tr>
                            <td>Sr. No</td>
                            <td>Room</td>
                            <td>Name</td>
                            <td>Programme</td>
                        </tr>
                    </thead>
                    <tbody id="tbody_${year}">
                    </tbody>
                </table>
                            </div>
                        </div>
                    </div>`
                document.getElementById(`tags_${year}`).innerHTML += `<span id="tagall${year}" class="tag selected" onclick="filter('${year}','all')">All</span>`
                count++;
                for(branch in data[year]){
                    let branchId = "tag" + branch.replace(/ /g, "_") + year
                    document.getElementById(`tags_${year}`).innerHTML += `<span id="${branchId}" class="tag" onclick="filter('${year}','${branch}')" >${branch}</span>`
                    for(row in data[year][branch]){
                        document.getElementById(`tbody_${year}`).innerHTML += 
                        `<tr>
                        <td>${row}</td>
                        <td>${data[year][branch][row].room}</td>
                        <td>${data[year][branch][row].name}</td>
                        <td>${data[year][branch][row].programme}</td>
                        </tr>`
                    }
                }
            }
        })
    }).catch((e)=>{
        console.log(e);
    })

}

function toggleyear(id){
    document.querySelectorAll(".tab-pane").forEach( (element)=>{
        element.classList.remove("in")
        element.classList.remove("active")
    })

    document.getElementById(id).classList.toggle("in")
    document.getElementById(id).classList.toggle("active")


}

function filter(year , branch){
    console.log(year , branch)
    document.getElementById(`tbody_${year}`).innerHTML = ""
    if(branch=='all'){
        for(branch_ in data[year]){
            for(row in data[year][branch_]){
                document.getElementById(`tbody_${year}`).innerHTML += `<tr>
                <td>${row}</td>
                <td>${data[year][branch_][row].room}</td>
                <td>${data[year][branch_][row].name}</td>
                <td>${data[year][branch_][row].programme}</td>
                </tr>`
            }
        }
    }else{
        for(row in data[year][branch]){
            document.getElementById(`tbody_${year}`).innerHTML += `<tr>
            <td>${row}</td>
            <td>${data[year][branch][row].room}</td>
            <td>${data[year][branch][row].name}</td>
            <td>${data[year][branch][row].programme}</td>
            </tr>`
        }
    }

    document.querySelectorAll(`#tags_${year} .tag`).forEach((element)=>{
        element.classList.remove("selected")
    })
    console.log(`tag${branch.replace(/ /g, "_")}${year}`)
    document.getElementById(`tag${branch.replace(/ /g, "_")}${year}`).classList.add("selected")
}
// function filter(key){
//     document.querySelectorAll(".tags span").forEach((ele)=>{
//         ele.classList.remove("selected")
//     })
//     document.getElementById(`tag${key.replace(" ", "")}`).classList.toggle("selected");
//     document.getElementById("tbody1").innerHTML = ""
//     for (key2 in data[key]){
//         document.getElementById("tbody1").innerHTML += 
//                         `<tr>
//                         <td>${key2}</td>
//                         <td>${data[key][key2].roll}</td>
//                         <td>${data[key][key2].name}</td>
//                         </tr>`
//     } 
// }

function showall(){
    document.querySelectorAll(".tags span").forEach((ele)=>{
        ele.classList.remove("selected")
    })
    document.getElementById('tag_all').classList.add("selected");
    document.getElementById("tbody1").innerHTML = ""
    for(key in data){
        for(key2 in data[key]){
            document.getElementById("tbody1").innerHTML += 
            `<tr>
            <td>${key2}</td>
            <td>${data[key][key2].room}</td>
            <td>${data[key][key2].name}</td>
            <td>${data[key][key2].programme}</td>
            </tr>`
        }
    }
}

window.addEventListener('DOMContentLoaded' , () => getData());