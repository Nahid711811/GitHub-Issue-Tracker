const cardContainer = document.getElementById("cardContainer");
const allBtn = document.getElementById("allbtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const cardDetailsModal = document.getElementById("card_modal");

const loadIssues = (status = 'all') => {
    showSpinner();
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            hideSpinner(); 
            let issues = data.data;
            if (status !== 'all') {
                issues = data.data.filter(issue => issue.status === status);
            }
            displayIssues(issues);
        });
};


const getPriorityColor = (priorityColor) => {
    if (priorityColor === 'high') return 'color: red; background-color: #feecec;';
    if (priorityColor === 'medium') return 'color: #b8860b; background-color: #fff6db;';
    if (priorityColor === 'low') return 'color: gray; background-color: #e8e8e8;';
    return '';
};

const getBorder = (borderColor) => {
    if (borderColor == 'open') return 'border-top:3px solid green'
    if (borderColor == 'closed') return 'border-top:3px solid purple';
    return ''
};

const displayIssues = (issues) => {

    
    if(issues.length === 0){
        cardContainer.innerHTML = `
        <div class="text-center items-center flex flex-col">
            <img src="assets/istockphoto-827247322-612x612.jpg" class="w-[250px]" alt="">
            <h4>No Data Found!!</h4>
        </div>
        ` 
        const totalCount = document.getElementById('totalCount')
    totalCount.textContent = issues.length;
        return
    }
     cardContainer.innerHTML = ""
     const totalCount = document.getElementById('totalCount')
    totalCount.textContent = issues.length;
    issues.forEach((issue) => {

        
        const problem = document.createElement('div');
        problem.innerHTML = `
         <div style="${getBorder(issue.status)}" onclick="openModal(${issue.id})" class="cursor-pointer h-full p-[20px] sm:max-w-[350px]  space-y-6 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
            <span style="${getPriorityColor(issue.priority)}"class="py-[15px] px-[25px] rounded-lg font-semibold">${issue.priority}</span>
            <h3 class="font-semibold text-xl mt-[25px]">${issue.title}</h3>
            <p class="text-[#64748B] line-clamp-2 flex-1">${issue.description}</p>
            <div class="mt-[12px] flex gap-[12px] overflow-hidden">
                <span style="font-size:12px" class="rounded-lg   px-[10px] h-fit py-[8px] text-[red] bg-[#feecec]">${issue.labels[0]}</span>
                ${issue.labels[1] ? `<span style="font-size:12px" class="px-[10px] h-fit rounded-lg py-[8px] text-[#91918e] bg-[#fff6db]">${issue.labels[1]}</span>` : ''}
                </div>
            <div style ="border-top: 1px solid #64748B">
                <p class="text-[#64748B] text-[17px] mt-[10px]">#Author by ${issue.author}</p>
                <p class="text-[#64748B] text-[17px]">#CreateAt ${new Date(issue.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
        `
        cardContainer.appendChild(problem);
    })
    };

    // card
