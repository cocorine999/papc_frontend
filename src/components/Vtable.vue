<template>
  <div class="relative flex flex-col">
    <div class="overflow-x-auto">
      <div class="py-2  inline-block min-w-full">
        <div class=" overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b bg-gray-300">
              <tr>
                <th  scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  <label class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-1 rounded-lg cursor-pointer">
                    <input type="checkbox" class="form-checkbox focus:outline-none focus:shadow-outline" @click="selectAllCheckbox($event);">
                  </label>
                </th>
                <th v-for="(head ,index) in headers" :key="index" scope="col" class="text-sm whitespace-nowrap font-medium text-gray-900 px-6 py-4 text-left"> {{head.name}} </th>
                 <th scope="col" v-if="statut != undefined" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Statut</th>
                <th scope="col" v-if="actions != undefined" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
               
              </tr>
            </thead>
          
            <tbody>
              <tr  class="border-b border-gray-300" v-for="(data, index) in listes" :key="index">
                <td  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <label class="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                    <input type="checkbox" class="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline" :name="index" @click="getRowDetail($event, index,index)">
                  </label> 
                </td>
                <td  v-for="(head, indice) in headers" :key="indice" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <div class="text-xs w-full" v-if="head.props !== undefined">
                    <tr-table v-if="data[head.props] != null" :data="data[head.props][head.cle]" :objet="{ id: data.id, attribut: head.cle, extra: data[head.props][extra] }" :updateKey="head.updateKey" :options="head.options" :optionsKey="head.key" :isSelect="head.select != undefined ? head.select : false" :isEditable="head.edit != undefined ? head.edit : true" @update="update"></tr-table>
                    <tr-table v-else data="Non definit" :objet="{ id: data.id, attribut: head.cle, extra: '' }" :updateKey="head.updateKey" :options="head.options" :optionsKey="head.key" :isSelect="head.select != undefined ? head.select : false" :isEditable="head.edit != undefined ? head.edit : true" @update="update"></tr-table>
                  </div>
                  <div class="text-xs w-full" v-if="head.props === undefined "> 
                    <tr-table :status="head.status" :data="data[head.cle]" :objet="{ id: data.id, attribut: head.cle, extra: data[extra] }" :updateKey="head.updateKey" :options="head.options" :optionsKey="head.key" :isSelect="head.select != undefined ? head.select : false" :isEditable="head.edit != undefined ? head.edit : true" @update="update"> </tr-table>
                  </div>
                </td>
                <td v-if="statut != undefined" class="text-sm  space-x-3 text-gray-900 font-light px-6 py-4 flex items-center whitespace-nowrap">
                   <span v-if="statut ==0" class="bg-purple-500 text-white px-2 py-1 rounded-md">  en cours </span>
                   <span v-if="statut ==-1" class="bg-green-500 text-white px-2 py-1 rounded-md">  valider </span>
                   <span v-if="statut ==-2" class="bg-red-500 text-white px-2 py-1 rounded-md">  non valider </span>
                </td>
                <td   v-if="actions != undefined"  class="text-sm  space-x-3 text-gray-900 font-light px-6 py-4 flex items-center whitespace-nowrap">
                  <div v-for="(action,index) in actions" :key="index" class="flex item-center justify-center">
                    <div v-if="action.name === 'suivre'" title="suivre" @click="$emit('suivre', data.id)" class=" mr-2 cursor-pointer transform hover:text-blue-500 hover:scale-110">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </div>
                    <div v-if="action.name === 'supprimer'" @click="$emit('supprimer', data)" class=" mr-2 cursor-pointer transform hover:text-red-500 hover:scale-110">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
                    </div>
                    <div v-if="action.name === 'consulter'" title="consulter les suivis" @click="$emit('consulter', data.id)" class=" mr-2 cursor-pointer transform hover:text-blue-500 hover:scale-110">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                    </div>
                    <div v-if="action.name === 'fichier'" title="consulter les fichiers" @click="$emit('seeUpload', data.id)">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 14 16" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM1 3h5v1H1V3zm6 9v-2c-.98-.02-1.84.22-2.55.7-.71.48-1.19 1.25-1.45 2.3.02-1.64.39-2.88 1.13-3.73C4.86 8.43 5.82 8 7.01 8V6l4 3-4 3H7z"></path></svg>
                    </div>
                    
                  </div> 
                  <div v-if="isComment" @click="$emit('commentairer', index)" title="lacher un commentaire" class=" mr-2 cursor-pointer transform text-indigo-300 hover:text-indigo-400 hover:scale-110">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path></svg>
                  </div>       
                </td>
              </tr>              
            </tbody>
          </table>
        </div>
       
      </div>
    </div>
     <div class=" absolute -bottom-12 right-2 " v-if="totalPages >5">
      <pagination
        :totalPages="totalPages"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      ></pagination>
      </div>
    <!--  -->
     
  </div>
</template>

<script>
import TrTable from '@/components/TrTable'
import Pagination from '@/components/Pagination'
export default {
  components: { TrTable,Pagination },
  props:['datas', 'headers', 'actions', 'extra', 'sendRequest','isComment'],
  data() {
    return{
      currentPage:1,
      perPage:5,
      selectedRows: [],
      listeSelection:[],
      statut:[
        {name:'en cours',value:0},
        {name:'valider',value:-1},
        {name:'non valider',value:-2}
      
      ],
    }
  },
  computed: {
    totalPages() {
      if(this.datas != undefined) {
        return this.datas.length
      }
    },
    listes() {
      let datas = []
       if(this.datas != undefined) { 
          for (let index = this.perPage * this.currentPage - this.perPage; index < this.perPage * this.currentPage; index++) {
            if(index <= this.totalPages-1) {
              const element = this.datas[index];
              datas.push(element)
            }
          }
          return datas
        }
      
    },
  },
  methods: {

    update(id, type, input, value)
    {
      if(this.sendRequest === false){
        this.$emit('updateInputData', id, input, value)
      }
    },

    onPageChange(page) {
      if( page ===this.totalPages) {
        page = this.totalPages / this.perPage
      }
      this.currentPage = page
    },
    getRowDetail($event, count,dataId) {
        count++
				let rows = this.selectedRows;
				if (rows.includes(count)) {
					let index = rows.indexOf(count);
					rows.splice(index, 1);
          this.listeSelection.pop(dataId)
				} else {
					rows.push(count);
          this.listeSelection.push(dataId)
				}
        if(count ===0) {
          this.alert = false
        }
        console.log(this.listeSelection)
        
		},
    selectAllCheckbox($event,count,dataId) {
			let columns = document.querySelectorAll('.rowCheckbox');
			this.listeSelection = [];
			if ($event.target.checked == true) {
				columns.forEach(column => {
				  column.checked = true
				  this.listeSelection.push(parseInt(column.name))
          console.log("tout les elements",this.listeSelection)
				});
			} else {
				columns.forEach(column => {
				  column.checked = false
				});
			  this.listeSelection = [];
			}
      
		},
    toggleColumn(key) {
      let columns = document.querySelectorAll('.' + key);
      if (this.$refs[key].classList.contains('hidden') && this.$refs[key].classList.contains(key)) {
        columns.forEach(column => {
          column.classList.remove('hidden');
        });
      } else {
        columns.forEach(column => {
          column.classList.add('hidden');
        });
      }
		},
  }
  
}
</script>

<style>

</style>