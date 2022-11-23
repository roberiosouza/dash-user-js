class UserController {

	constructor(formId, tableId){
		this.formEl = document.getElementById(formId);
		this.tableId = document.getElementById(tableId);

		this.onSubmit();
	}

	onSubmit(){

		this.formEl.addEventListener("submit", event => {
			event.preventDefault();

			let values = this.getValues();

			// Chamando a função getPho de maneira síncrona
		 	/*	this.getPhoto((content)=>{
				values.photo = content;
				this.addLine(values, this.tableId);
			}); */		

			//Chamando a função getPhoto de maneira Assícrona
			this.getPhoto().then(

				(content) => {
					values.photo = content;
					this.addLine(values, this.tableId)
				},

				(e) => {
					console.error(e);
				}

			);					

		});

	}

	//Função síncrona getPhoto
	/* getPhoto(callback){
		let fileReader = new FileReader();

		let elements = [...this.formEl.elements].filter(item => {
			if(item.name === 'photo') return item;
		});

		let file = elements[0].files[0];

		fileReader.onload = () => {
			callback(fileReader.result)
		};

		fileReader.readAsDataURL(file);

	} */

	//Função Asíncrona getPhoto
	getPhoto(){

		return new Promise((resolve, reject) => {

			let fileReader = new FileReader();

			let elements = [...this.formEl.elements].filter(item => {
				if (item.name === 'photo') return item;
 			});

			let file = elements[0].files[0];

 			fileReader.onload = () => {
 				resolve(fileReader.result);
 			}

 			fileReader.onerror = (e) => {
 				reject(e);
 			};

 			file ? fileReader.readAsDataURL(file) : resolve('dist/img/boxed-bg.jpg');

		});

	}

	getValues(){
		let user = {};

		event.preventDefault();

	    [...this.formEl.elements].forEach(function(field, index){

	        if (field.name === "gender") {

	            if (field.checked) {
	                user[field.name] = field.value
	            }

	        }else if (field.name === "admin") {

	            user[field.name] = field.checked;

	        } 
	        else {

	            user[field.name] = field.value

	        }

	    });

	    return new User(user.name, user.gender, user.birth, 
	                           user.country, user.email, user.password, user.photo, user.admin);

	}

	addLine(dataUser, tableId) {

	    console.log(dataUser);

	    let tr = document.createElement("tr");

	    tr.innerHTML = `
	        <tr>
	            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
	            <td>${dataUser.name}</td>
	            <td>${dataUser.email}</td>
	            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
	            <td>${dataUser.birth}</td>
	            <td>
	                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
	                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
	            </td>
	        </tr>
	    `;

	    this.tableId.appendChild(tr);

	}

}