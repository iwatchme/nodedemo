const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost/mongoexercies", {
        useNewUrlParser: true
    })
    .then(() => console.log("success connect"))
    .catch(err => console.log(err))

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        // required: function() {
        //     return this.isPublised;
        // }
        minlength:5,
        maxlength:255,
        // match: /pattern/,
    
    },
    category: {
        type: String,
        required: true,
        enum:['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase:true,
        // trim: true
    },
    author: String,
    tags: {
        type:Array,
        validate: {
          isAsync: true, 
          validator: function(v, callback) {
              //Do async work
              setTimeout(()=> {
                 const result = v && v.length > 0;
                 callback(result)
              }, 4000)
          
         },
         message: 'A message should have at least one tag'  
        }
       
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: function() {
            return this.isPublished
        },
        min:10,
        max:200,
        get:(v)=> Math.round(v),
        set:(v)=>Math.round(v)
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

const saveCourse = async () => {
    const course = new Course({
        name: "C.js",
        author: 'frank',
        tags: null,
        isPublished: true,
        category:"-"
    });

    try{
        const result = await course.save()
        console.log(result)
    } catch(e) {
        for(field in e.errors) {
            console.log(e.errors[field].message);
        }

    }
   
};

saveCourse();

const getCourses = async () => {
    const courses = await Course.find()
        .and([{
            isPublished: true
        }, {
            tags: {
                $in: ["backend"]
            }
        }])
        .sort({
            name: 1
        })
        .select({
            name: 1,
            author: 1
        })


    return courses;

}

getCourses().then(courses=>console.log(courses))


const getCoursesTwo = async () => {
    return await Course.find()
        .and([{
            isPublished: true
        }, {
            tags: {
                $in: ["backend", "frontend"]
            }
        }])
        .sort({
            price: -1
        })
        .select("price name author")
}


// getCoursesTwo().then(courses=>console.log(courses))


const getCoursesThree = async () => {
    return await Course.find({
        isPublised: true,
        prices: {
            $ge: 15
        },
        name: /.*by.*/i
    })
}

getCoursesThree().then(courses => console.log(courses))