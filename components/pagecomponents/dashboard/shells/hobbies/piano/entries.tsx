export default function Piano() {

    var today = new Date();
    var pastDate = new Date('4/1/2024');
    for (var i = 0; i < 20; i++) {
        pastDate.setDate(pastDate.getDate() + 1);
        console.log(pastDate);
    }

    var pianoarrays = [{
        description: "sight reading",
        time: '40',
        date: '4/9/2024',
    }];
        

    return pianoarrays;
}