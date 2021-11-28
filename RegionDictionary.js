"use strict"


const RegionDictionary = {

    dictionary:[],

    codeList: [
        [1],[2,102,],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13,113],[14],[15],[16,116],[17],[18],[19],[20],[21,121],[22],[23,93,123],[24,84,88,124],
        [25,125],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36,136],[37],[38,85],[39,91],[40],[41,82],[42,142],[43],[44],[45],[46],[47],[48],
        [49],[50,90,150,190],[51],[52,152],[53],[54,154],[55],[56],[57],[58],[59,81,159],[60],[61,161],[62],[63,163],[64,164],[65],
        [66,96],[67],[68],[69],[70],[71],[72],[73,173],[74,174],[75,80],[76],[77,97,99,177,199,197,777],[78,98,178],[79],[83],[86],[87],
        [89],[94],[95]
    ],

    regionList: [
        ["1","Республика Адыгея"],["2","Республика Башкортостан"],["3","Республика Бурятия"],["3","Республика Алтай"],
        ["4","Республика Дагестан"],["4","Республика Ингушетия"],["4","Кабардино-Балкарская Республика"],["1","Республика Калмыкия"],["4","Республика Карачаево-Черкесия"],
        ["5","Республика Карелия"],["5","Республика Коми"],["2","Республика Марий Эл"],["2","Республика Мордовия"],["6","Республика Саха (Якутия)"],
        ["4","Республика Северная Осетия — Алания"],["2","Республика Татарстан"],["3","Республика Тыва"],["2","Удмуртская Республика"],["3","Республика Хакасия"],
        ["0","код 20 был аннулирован, замена на 95"],["2","Чувашская Республика"],["3","Алтайский край"],["1","Краснодарский край"],["3","Красноярский край"],
        ["6","Дальневосточный край"],["4","Ставропольский край"],["6","Хабаровский край"],["6","Амурская область"],["5","Архангельская область"],["1","Астраханская область"],
        ["7","Белгородская область"],["7","Брянская область"],["7","Владимирская область"],["1","Волгоградская область"],["5","Вологодская область"],["7","Воронежская область"],
        ["7","Ивановская область"],["3","Иркутская область"],["5","Калининградская область"],["7","Калужская область"],["6","Камчатский край"],["3","Кемеровская область"],
        ["2","Кировская область"],["7","Костромская область"],["8","Курганская область"],["7","Курская область"],["5","Ленинградская область"],["7","Липецкая область"],
        ["6","Магаданская область"],["7","Московская область"],["5","Мурманская область"],["2","Нижегородская область"],["5","Новгородская область"],["3","Новосибирская область"],
        ["3","Омская область"],["2","Оренбургская область"],["7","Орловская область"],["2","Пензенская область"],["2","Пермский край"],["5","Псковская область"],
        ["1","Ростовская область"],["7","Рязанская область"],["2","Самарская область"],["2","Саратовская область"],["6","Сахалинская область"],["8","Свердловская область"],
        ["7","Смоленская область"],["7","Тамбовская область"],["7","Тверская область"],["3","Томская область"],["7","Тульская область"],["8","Тюменская область"],
        ["2","Ульяновская область"],["8","Челябинская область"],["3","Забайкальский край"],["7","Ярославская область"],["7","г. Москва"],["5","г. Санкт-Петербург"],
        ["6","Еврейская автономная область"],["5","Ненецкий автономный округ"],["8","Ханты-Мансийский автономный округ - Югра"],["6","Чукотский автономный округ"],
        ["8","Ямало-Ненецкий автономный округ"],["0","Территории, находящиеся за пределами РФ, обслуживаемые органами внутренних дел Российской Федерации (Байконур, антарктические станции)"],["4","Чеченская республика"]
    ],

    districtList: [
        ["1","Южный регион"],["2","Приволжский регион"],["3","Сибирский регион"],["4","Северо-Кавказский регион"],["5","Северо-Западный регион"],
        ["6","Дальневосточный регион"],["7","Центральный регион"],["8","Уральский регион"],["0","Без региона"]],

          // start app with question & check answer
    start: function(r=false){
        if (!r){this.createDictionary()}
        let userAnswer = (prompt("Enter region, district name or code you're looking for?"))
        switch (userAnswer) {
            case "":
            case "0":
                userAnswer = "Без региона";
                this.getCode(userAnswer)
                break;
            case undefined:
            case null:
                this.end;
                break;
            default:alert
                isNaN(userAnswer) ? this.getCode(userAnswer) : this.getRegion(userAnswer);
                break;
        }
    },
            // exit app
    end: () => alert("See ya later. Bye!"),

           // create codes & regions summary data for dictionary in common array
    createDictionary: function(){
        this.regionList.map((el,i)=>{ el.push(this.codeList[i]) ;})
        return (this.districtList.forEach ((e,i)=>{
            this.dictionary[this.districtList[i][0]] = this.regionList.filter((el)=> this.districtList[i][0] == el[0])
        }))
    },

          // returns the region name such as ("Южный регион")
    getDistrict: function(districtCode){
        let result = this.districtList.find(el=>el[0].includes(districtCode))
        return result[1]
    },

        // if the answer is the name of the district => al codes searching
    getAllDistrictsCodes: function(userAnswer){
        let message = []
        let result = this.districtList.find(el=>el[1].includes(userAnswer))
        if (!result){
            alert("There is no what you want. \n Try again.")
            this.start(true)
        }
        let district = this.getDistrict(result[0])
        for (let i of this.dictionary[result[0]]){
            message.push(`    ${i[1]} --> Код:  ${i[2]} \n`)
        ;}
        alert(`${district} \n ${message.toString()}`)
        this.start(true)
    },

       // if the answer is the name of the region => code searching
    getCode: function(userAnswer) {
        userAnswer = userAnswer.trim().slice(1 ,6) || "Без региона";
        let result = this.regionList.find(el=>el[1].includes(userAnswer));

        if (!result){ this.getAllDistrictsCodes(userAnswer) }
        let district =  this.getDistrict(result[0]);
        alert(`${district}\n \t ${result[1]}\n \t Код: ${result[2]}`)
        this.start(true)
    },

        // if the answer is the regions' code => region searching
    getRegion: function (regionCode){
        regionCode = +regionCode.trim().slice(0 ,3)
        let result = this.regionList.find(el=>el[2].includes(regionCode)) ?? this.regionList.find(el=>el[2] == regionCode)
        if (!result){
            alert("There is no that code what you want. \n Try again.")
            this.start(true)
            }
        let district =  this.getDistrict(result[0]);
        alert(`${district}\n \t ${result[1]}\n \t Код региона:  ${result[2]}`);
        this.start(true)
    }
}

RegionDictionary.start()