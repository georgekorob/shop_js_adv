Vue.component('searchcomp',
    {
        data() {
            return {
                userSearch: '',
            }
        },
        template: `
            <div class="col-md-11 text-end">
                <form action="#" @submit.prevent="$root.$refs.showcase.filter(userSearch)">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>
        `
    }
)