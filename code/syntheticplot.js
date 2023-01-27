let AWS = require("aws-sdk");
let studentID = 'M00704320';
const PLOTLY_USERNAME = 'kazi123';
const PLOTLY_KEY = 'YrHB4SaoeT2HvlBYFArR';
let plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_KEY);
const endpointName = "syntheticEndpoint";
const endpointData = {
    "instances" :
    [
        {
            "start" : "2020-04-08 09:00:00",
            "target" : [489.71986084799727,517.5465197929511,520.551111618765,480.9406630056604,500.46483760168167,529.694031174618,509.4895917880156,532.5128170226733,559.4113317757706,525.8566440029942,582.1030126979895,576.3329362801564,570.4186895593293,568.6283797616584,565.3350912268107,594.56231243311,582.9297278117757,594.5473899143911,546.0560540910178,587.3757287039452,570.6122227733462,540.5986044897622,526.5058809840474,527.7050029616664,540.1087765165576,547.187266293174,519.3999367867544,518.8017786051494,556.1053440179626,535.0452771850199,571.5341954071972,560.0304774959635,588.3692381098368,564.6353437692611,584.8039933478617,617.7336077375091,600.3774519120286,613.7117302085877,594.794774983249,594.3881389199695,628.2045933983404,572.000154776511,565.4570647395692,604.2478360395609,591.1726488329882,581.8845179725911,546.0253069692839,561.9845973817007,524.7720121670577,567.2034074640336,564.9639820286113,531.6605406161632,534.9417051721848,573.7245269248705,570.784184337894,601.7521050773056,558.7918514593975,618.0401779035172,589.1382531392358,614.887853851224,642.5525256785647,594.1068783320877,637.7775199772577,613.2640920203628,632.8292291626494,644.225542492295,619.3469035372777,577.6754248662447,621.758100478862,592.4620264532006,566.70338580733,566.5040340688472,576.6708890369201,589.5660425839717,578.7870465658519,571.469404952419,589.3559964623433,570.6693793911734,578.8346073154542,604.854300196949,588.4543397117988,624.949936979509,608.0731104225342,619.698840703161,662.5066804873353,657.6193275794147,638.9622941484944,642.7884928079767,634.3139225054545,667.0180291604082,635.4426647343582,652.1669623992935,631.3325930778859,619.8892404460282,622.0253320377393,593.2761030730717,576.7662485237424,563.684109236109,599.7571288429708,580.7811958839344]
        }
    ],
    "configuration":
    {
        "num_samples":50,
        "output_types":["mean","quantiles","samples"],
        "quantiles":["0.1","0.9"]
    }
};
let params = {
    EndpointName : endpointName,
    Body : JSON.stringify(endpointData),
    ContentType : "application/json",
    Accept : "application/json"
};
let xValues = [];
let yValuesPredicted =[];
let mean =[];
let quantiles1 = [];
let quantiles9 = [];
let syntheticData = [174.07421904071091,195.15582045894217,205.26830725737085,202.4879590173997,207.18059058470467,219.2946204865778,225.83600855643314,211.33232199119857,209.29968295228824,203.42940359674745,198.17198708105272,192.74138481275966,180.0918542229718,182.18720157140112,167.1819853722369,169.05439754334634,162.54934428179385,167.17330632354805,158.70890027439754,163.80369078592884,164.55925642348436,175.30170154457764,187.49999955646385,184.2111065580048,199.93127024934736,212.43997212381416,216.10155971653833,227.77726220420033,228.4827780993762,232.46049457202798,231.31616943724222,246.6627989484265,239.23308073268382,229.50017635835755,220.24462231204916,214.63328555666888,215.388160808439,197.28839686503252,200.64037167744794,182.37143804966573,176.97531362805285,183.44647537074067,187.91048858841353,188.08504455433558,191.8954109646708,192.01399380998043,197.31071050238353,221.17012324120475,231.00313052075242,227.72845227000724,236.52736619817068,259.33080135883426,262.5752268330378,249.27245557707568,275.3854641510315,259.91224310690393,251.6506194721214,259.2985156044899,256.7837390743101,252.07275732509956,221.41086592032465,217.70933669499698,211.11702692343835,205.18778932293617,198.5005553049866,211.21902232859753,192.65404652912412,206.91497619414653,212.83507707765,221.09948331387085,226.48622375966144,233.03970260905453,242.72836281727555,264.6425333393917,255.56570818422884,281.3720970117853,279.1023754387394,271.4448984985524,295.96817886590344,296.7214832887406,270.4181494731036,268.3402815306799,263.0437297563654,262.45587460932194,263.8470521516449,247.31388250019936,248.86006862657933,235.8756105772777,232.34541020154137,226.39874136825443,216.62851235416628,226.32443046353492,239.3153030984929,240.8235559530848,254.15893582980962,255.51849226724144,276.4048032043657,279.0623559036461,283.5129755929732,295.1880082256874,293.5223563995103,294.50241746709514,306.3632756585296,310.86874142188907,298.99296108711843,295.6605437289795,284.14691589901366,290.2168823173729,276.4948520068186,266.5935396783835,270.8749163104437,254.00977364220324,247.55059500622497,237.17555388112598,234.8842646069655,238.02386899471077,246.85674782552235,246.86538377469242,270.5637208426734,276.3926722883616,285.43607137871,293.2015245511554,294.9496080869132,317.1579530560348,333.12998162175967,309.9238102522415,335.045134691973,319.7167656056473,335.25047079455464,319.8641863594581,314.147286948977,312.48939346418734,284.90153163829683,286.94410130971124,270.6074946406473,285.53561584994765,270.32443968476423,263.0610237735051,274.35634934616246,274.49633771757345,282.96608187907134,291.046843539157,292.4155324213476,291.19608092009804,321.16242690268325,303.73146293913305,327.4119412386586,330.3336451473814,325.41258688573083,363.4611787762665,365.0697390662118,341.09653506873235,359.4066841016463,333.59795303400955,342.6847190435444,321.21338447425785,302.5741416945313,320.9290134686948,299.0975095817103,297.240505384171,285.8311108038151,300.082818395833,279.6287495118012,301.9048072196878,290.9412536448886,292.44928322353695,316.5635207318721,317.5046783942487,339.72715364732676,337.6997964035183,335.4050253170154,351.7925284466456,370.72293305198133,378.95661392626874,374.0905980630075,354.51198208780414,373.8153465468412,365.07659113766135,370.7056071043521,337.05808450166893,355.48260839553177,329.48294371220067,320.4182145575193,320.35419923677324,305.47101923261965,317.34230530782247,321.92457407563114,314.1523974338569,331.0838728683417,325.1345950624042,325.8403526434084,329.37760827982567,366.90200140692775,362.2923927343023,378.44145835110317,373.4176870874145,373.640186610733,408.278785108716,392.6684130175967,405.025993456683,375.1164784928953,366.85477460412403,369.5740734468975,386.58982954056887,348.69408278124695,357.4552575807038,333.07471675759695,331.4869772030468,330.217563644272,330.55232176375716,328.9675516781422,343.141873283615,348.73297492286963,336.1608552152539,369.39943946292414,368.3223899675869,378.41940052968624,395.2982589799359,382.83079516776235,390.9622018371816,395.6625088190846,390.9862999292103,394.9831935922843,424.16583289716044,416.3451586022848,418.10405290236775,378.4026995647874,374.7380375696651,392.0541837936103,367.05710640610624,354.1887165026559,344.9678305129975,360.43978351758,358.2760946137823,369.06336233378755,368.96302454479087,361.51713620463477,361.7324100211991,359.1089801920752,366.1039713874022,376.34356443577934,401.4389076200442,398.85673333972267,423.30241440183846,445.65377717930187,447.185267453414,447.64767067507853,415.3238550311216,448.5404592088541,432.93238295820527,404.55097119436226,412.4699477444108,415.47063548973034,409.2732364539819,398.1880070570968,396.3031783248457,378.6026280458431,379.807437507345,366.691960318397,376.03767244403844,373.65360483115603,384.9639474840234,391.32077484830165,384.8860896120799,401.12097239088797,407.2143384050189,430.4114787864897,427.66445285985907,438.65979653423915,454.04272501407354,469.9501026002358,471.68919345666905,472.6146148613266,459.0499122069002,428.4318425497772,418.1157895395327,408.48239532641844,411.2239587173024,421.26803595652035,417.60710288372985,380.04951647980585,402.4893496812219,407.3289165557488,415.20862055487936,413.6159592307487,407.31925005479405,412.70040937548265,409.32804112227853,424.39128286613186,444.45774040985737,455.99619329137244,449.80968145432473,457.2770913197502,467.03153114252984,498.59699985497826,484.31695857041854,489.81757108926143,455.0688729000853,457.8188348494462,460.57356539052654,464.623998190506,430.6669744292058,425.60433631947933,441.61371778041615,398.26832602885884,422.4269307196514,400.41639555022755,402.8215029586597,441.32635248096386,441.79907654290093,430.4897904089844,431.958557479048,457.3920684139804,449.16673175847166,498.3011596438423,508.66303448961054,511.695660158128,472.0974454717192,495.03161535483946,520.3153791074625,499.30400648060413,506.61568744201026,475.9377528416008,457.64606106073785,457.7135239691548,470.5338488540534,437.711875051397,442.34740490295565,422.39910103784916,429.86779965234615,448.15778094383626,454.76979141432105,464.0020192840336,465.03045787427834,459.54297965904294,462.14539692105825,466.6774908171818,464.83866777026446,508.7898202627012,489.087559211244,497.12569082447493,538.8257781832979,514.2899809197689,536.650904385451,530.9624756149244,535.9244949766419,524.4544551334908,510.5556550231259,491.3264351676815,474.8319836660481,494.7345498587282,453.82704485943964,446.8939646983713,455.0995738550288,451.2954363025993,457.6820676421448,455.92002069852737,466.46315567817504,471.01438500936825,477.9943588494821,497.0648813189334,527.3584012371493,534.4221402249009,552.8828337919125,543.843781876157,551.1545835179033,523.7760025190832,563.7084005145085,562.3162218019307,512.1566044335312,550.8553598178426,540.4732958281647,526.8483436862828,500.00559461894636,472.084954830067,485.5095954840348,468.50851942176,459.474609890675,475.7557816577277,495.52302633559833,493.12540287591185,489.5526140350363,509.7725380684051,511.8613529548594,525.7636111719713,520.0030387064824,514.147832972771,539.4901409098782,554.7524971756626,576.5840633814217,581.4601330709855,573.1643367858929,533.0266913264902,528.8335795216252,523.7670787632039,523.3588691407413,522.7009766573696,542.2634661533182,499.81144635588555,500.24656084031,489.71986084799727,517.5465197929511,520.551111618765,480.9406630056604,500.46483760168167,529.694031174618,509.4895917880156,532.5128170226733,559.4113317757706,525.8566440029942,582.1030126979895,576.3329362801564,570.4186895593293,568.6283797616584,565.3350912268107,594.56231243311,582.9297278117757,594.5473899143911,546.0560540910178,587.3757287039452,570.6122227733462,540.5986044897622,526.5058809840474,527.7050029616664,540.1087765165576,547.187266293174,519.3999367867544,518.8017786051494,556.1053440179626,535.0452771850199,571.5341954071972,560.0304774959635,588.3692381098368,564.6353437692611,584.8039933478617,617.7336077375091,600.3774519120286,613.7117302085877,594.794774983249,594.3881389199695,628.2045933983404,572.000154776511,565.4570647395692,604.2478360395609,591.1726488329882,581.8845179725911,546.0253069692839,561.9845973817007,524.7720121670577,567.2034074640336,564.9639820286113,531.6605406161632,534.9417051721848,573.7245269248705,570.784184337894,601.7521050773056,558.7918514593975,618.0401779035172,589.1382531392358,614.887853851224,642.5525256785647,594.1068783320877,637.7775199772577,613.2640920203628,632.8292291626494,644.225542492295,619.3469035372777,577.6754248662447,621.758100478862,592.4620264532006,566.70338580733,566.5040340688472,576.6708890369201,589.5660425839717,578.7870465658519,571.469404952419,589.3559964623433,570.6693793911734,578.8346073154542,604.854300196949,588.4543397117988,624.949936979509,608.0731104225342,619.698840703161,662.5066804873353,657.6193275794147,638.9622941484944,642.7884928079767,634.3139225054545,667.0180291604082,635.4426647343582,652.1669623992935,631.3325930778859,619.8892404460282,622.0253320377393,593.2761030730717,576.7662485237424,563.684109236109,599.7571288429708,580.7811958839344];
let awsRuntime = new AWS.SageMakerRuntime({});
exports.handler =  event => {
        for(let i=0;i<500;i++)
    {
        xValues.push(i);
    }
    for(let j=500;j<550;j++)
    {
        yValuesPredicted.push(j);
    }
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
            mean = responseData.predictions[0]["mean"];
            quantiles1 = responseData.predictions[0].quantiles["0.1"];
            quantiles9 = responseData.predictions[0].quantiles["0.9"];
            plotsync(mean,quantiles1,quantiles9);
        }
    });


     
};

async function plotsync(mean,quantiles1,quantiles9){

   try {
        let plotResult = await plotData(mean,quantiles1,quantiles9);
        console.log("Plot for student '" + studentID + "' available at: " + plotResult.url);

    }
    catch (err) {
        console.log("ERROR: " + JSON.stringify(err));
    }
}

async function plotData(Mean,Quantiles1,Quantiles9){

    let trace1 = {
        x : xValues,
        y : syntheticData,
        mode : "lines",
        name : "Synthetic Data",
        line : {
            color : 'rgb(219,64,82)',
            size : 12
        }
    };
        let trace2 = {
        x : yValuesPredicted,
        y : Mean,
        mode : "lines",
        name : "Mean Prediction",
        line : {
            color : 'rgb(55,128,191)',
            width : 2
        }
    };
     let trace3 = {
        x : yValuesPredicted,
        y : Quantiles1,
        mode : "lines",
        name : "Quantiles 0.1",
        line : {
            color : 'rgb(155,128,191)',
            width : 2
        }
    };
    let trace4 = {
        x : yValuesPredicted,
        y : Quantiles9,
        mode : "lines",
        name : "Quantiles 0.9",
        line : {
            color : 'rgb(255,128,191)',
            width : 2
        }
    };
    
    let data = [trace1,trace2,trace3,trace4];

    let layout = {
        title: "Synthetic Data for " + studentID,
        font: {
            size: 25
        },
        xaxis: {
            title: 'Time (hours)'
        },
        yaxis: {
            title: 'Value'
        }
    };
    let graphOptions = {
        layout: layout,
        filename: "date-axes",
        fileopt: "overwrite"
    };
    return new Promise ( (resolve, reject)=> {
        plotly.plot(data, graphOptions, function (err, msg) {
            if (err)
                reject(err);
            else {
                resolve(msg);
            }
        });
    });
}