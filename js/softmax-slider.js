function smax() {
    /*
     Factory for new categories (category names and colours)
     */
    var CategorySource = (function () {
        var nameIndex = -1;

        var colourIndex = -1;

        var names = [
            'Aardvark', 'Albatross', 'Alligator', 'Alpaca', 'Ant', 'Anteater', 'Antelope', 'Ape', 'Armadillo', 'Ass', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear', 'Beaver',
            'Bee', 'Bison', 'Boar', 'Buffalo', 'Butterfly', 'Camel', 'Caribou', 'Cat', 'Caterpillar', 'Cattle', 'Chamois', 'Cheetah', 'Chicken', 'Chimpanzee',
            'Chinchilla', 'Clam', 'Cobra', 'Cockroach', 'Cod', 'Cormorant', 'Coyote', 'Crab', 'Crane', 'Crocodile', 'Crow', 'Curlew', 'Deer', 'Dinosaur', 'Dog',
            'Dogfish', 'Dolphin', 'Donkey', 'Dove', 'Dragonfly', 'Duck', 'Eagle', 'Eel', 'Eland', 'Elephant', 'Elephant seal',
            'Elk', 'Emu', 'Falcon', 'Ferret', 'Finch', 'Fish', 'Flamingo', 'Fly', 'Fox', 'Frog', 'Gazelle', 'Gerbil', 'Giant Panda', 'Giraffe', 'Gnat', 'Gnu', 'Goat',
            'Goose', 'Goldfinch', 'Goldfish', 'Gorilla', 'Goshawk', 'Grasshopper', 'Grouse', 'Guinea fowl', 'Guinea pig', 'Gull', 'Hamster', 'Hare', 'Hawk',
            'Hedgehog', 'Heron', 'Herring', 'Hippopotamus', 'Hornet', 'Horse', 'Human', 'Hummingbird', 'Hyena', 'Jackal', 'Jaguar', 'Jellyfish', 'Kangaroo', 'Koala',
            'Lapwing', 'Lark', 'Lemur', 'Leopard', 'Lion', 'Llama', 'Lobster', 'Locust', 'Loris', 'Louse', 'Lyrebird', 'Magpie', 'Mallard',
            'Manatee', 'Marten', 'Meerkat', 'Mink', 'Mole', 'Monkey', 'Moose', 'Mouse', 'Mosquito', 'Mule', 'Narwhal', 'Newt', 'Nightingale', 'Octopus', 'Okapi', 'Opossum',
            'Ostrich', 'Otter', 'Owl', 'Ox', 'Oyster', 'Panther', 'Parrot', 'Partridge', 'Peafowl', 'Pelican', 'Penguin', 'Pheasant', 'Pig', 'Pigeon', 'Pony',
            'Porcupine', 'Porpoise', 'Prairie Dog', 'Quail', 'Rabbit', 'Raccoon', 'Rail', 'Ram', 'Rat', 'Raven', 'Red deer', 'Red panda', 'Reindeer', 'Rhinoceros',
            'Rook', 'Ruff', 'Salamander', 'Salmon', 'Sand Dollar', 'Sandpiper', 'Sardine', 'Scorpion', 'Sea lion', 'Sea Urchin', 'Seahorse', 'Seal', 'Shark', 'Sheep',
            'Shrew', 'Shrimp', 'Skunk', 'Snail', 'Snake', 'Spider', 'Squid', 'Squirrel', 'Starling', 'Stingray', 'Stinkbug', 'Stork', 'Swallow', 'Swan', 'Tapir',
            'Termite', 'Tiger', 'Toad', 'Trout', 'Turkey', 'Turtle', 'Viper', 'Vulture', 'Wallaby', 'Walrus', 'Wasp', 'Weasel', 'Whale', 'Wolf',
            'Wombat', 'Woodcock', 'Woodpecker', 'Worm', 'Wren', 'Yak', 'Zebra'];

        var backgroundColours = [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        ];

        var borderColours = [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)'
        ];

        function nextName() {
            nameIndex = Math.floor(Math.random() * names.length);
            return names[nameIndex]
        }

        function nextColour() {
            colourIndex = (colourIndex + 1) % backgroundColours.length;
            return {background: backgroundColours[colourIndex], border: borderColours[colourIndex]};
        }

        return {
            newCategory: function () {
                var colour = nextColour();
                var name = nextName();

                return {
                    background: colour.background,
                    border: colour.border,
                    name: name
                }
            }
        }
    })();

    /*
     Control for Chart.js instances
     */
    var SoftmaxChart = (function (softmaxChartContainerId, inputChartContainerId) {
        Chart.defaults.global.legend.display = false;

        var chartContainer = $('#' + softmaxChartContainerId);

        var inputChartContainer = $('#' + inputChartContainerId);

        var inputChart = new Chart(inputChartContainer, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        }, scaleLabel: {
                            display: true,
                            labelString: 'Input value'
                        }
                    }]
                }
            }
        });
        var inputChartData = inputChart.config.data;

        var softmaxChart = new Chart(chartContainer, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        }, scaleLabel: {
                            display: true,
                            labelString: 'SoftMax output value'
                        }
                    }]
                }
            }
        });
        var softmaxChartData = softmaxChart.config.data;

        function render() {
            inputChart.update();
            softmaxChart.update();
        }

        return {
            newCategory: function (category) {
                inputChartData.labels.push(category.name);
                inputChartData.datasets[0].data.push(category.value);
                inputChartData.datasets[0].backgroundColor.push(category.background);
                inputChartData.datasets[0].borderColor.push(category.border);

                softmaxChartData.labels.push(category.name);
                softmaxChartData.datasets[0].data.push(category.softmaxValue);
                softmaxChartData.datasets[0].backgroundColor.push(category.background);
                softmaxChartData.datasets[0].borderColor.push(category.border);

                render();
            },
            removeCategory: function (index) {
                _.map([inputChartData.labels,
                        inputChartData.datasets[0].data,
                        inputChartData.datasets[0].backgroundColor,
                        inputChartData.datasets[0].borderColor,
                        softmaxChartData.labels,
                        softmaxChartData.datasets[0].data,
                        softmaxChartData.datasets[0].backgroundColor,
                        softmaxChartData.datasets[0].borderColor
                    ],
                    function (array) {
                        array.splice(index, 1);
                    });

                render();
            },
            updateCategoryValues: function (data) {
                _.forEach(data, function (item) {
                    inputChart.config.data.datasets[0].data[item.index] = item.value;
                    softmaxChart.config.data.datasets[0].data[item.index] = item.softmaxValue;
                });

                render();
            }
        };
    })('softmax-chart-container', 'input-chart-container');

    /*
     Widget containing sliders for each category
     */
    var CategoryWidget = (function (categoryControlsId) {
        var categoryControls = $('#' + categoryControlsId);

        function getCategorySliderContainer(index) {
            return categoryControls.children()[index];
        }

        function getCategorySlider(index) {
            return $(getCategorySliderContainer(index)).find("input[use='slider']");
        }

        function getCategorySliderName(index) {
            return $(getCategorySliderContainer(index)).find("div[use='category-name']");
        }

        return {
            removeCategorySlider: function (index) {
                getCategorySliderContainer(index).remove();
            },
            newSlider: function (category) {
                getCategorySliderContainer(category.index).style.backgroundColor = category.background;
                getCategorySliderContainer(category.index).style.borderColor = category.border;
                getCategorySlider(category.index).slider('setValue', category.value);
                getCategorySliderName(category.index).text(category.name);
            }
        }
    })('category-controls');

    /*
     Wrapper round data - softmax input and output
     */
    var DataManager = (function () {
        var maxValue = 10;
        var rawValues = [];
        var softmaxValues = [];

        function recalculate() {
            var exps = _.map(rawValues, function (value) {
                return Math.exp(value);
            });

            var sum = _.sum(exps);

            softmaxValues = _.map(exps, function (exp) {
                return exp / sum;
            });
        }

        return {
            newCategory: function () {
                var index = rawValues.length;
                var value = Math.random() * maxValue;
                rawValues.push(value);
                recalculate();

                var softmaxValue = softmaxValues[index];

                return {value: value, index: index, softmaxValue: softmaxValue};
            },
            setRawValue: function (index, value) {
                rawValues[index] = value;

                recalculate();
            },
            remove: function (index) {
                rawValues.splice(index, 1);
                softmaxValues.splice(index, 1);

                recalculate();
            },
            getData: function () {
                return _.map(rawValues, function (inputValue, index) {
                    var softmaxValue = softmaxValues[index];
                    return {value: inputValue, softmaxValue: softmaxValue, index: index}
                });
            }
        }
    }());

    /*
     init function - bind to page and setup a few initial categories
     */
    (function (categoryControlTemplateId, categoryControlsId, addCategoryButtonId,
               dataManager, categorySource, categoryWidget, chart) {

        $('#' + addCategoryButtonId).click(function () {
            addNewCategory();
        });

        _.times(6, addNewCategory);

        function addNewCategory() {
            var template = $('#' + categoryControlTemplateId).children().first();
            var control = template.clone().appendTo('#' + categoryControlsId);

            control.find("input[use='slider']").slider().on('slide', function (ev) {
                var index = $(ev.target).parent().parent().parent().index();

                dataManager.setRawValue(index, ev.value);
                chart.updateCategoryValues(DataManager.getData());
            });
            control.find("button[use='remove']").click(function (ev) {
                var index = $(ev.target).parent().parent().parent().index();

                categoryWidget.removeCategorySlider(index);
                dataManager.remove(index);
                chart.removeCategory(index);
            });

            var newCategory = categorySource.newCategory();
            var newCategoryValues = dataManager.newCategory();
            var category = $.extend({}, newCategory, newCategoryValues);

            categoryWidget.newSlider(category);
            chart.newCategory(category);
            chart.updateCategoryValues(DataManager.getData());

            console.log(DataManager.getData())
        }
    })('category-control-template', 'category-controls', 'add-category',
        DataManager, CategorySource, CategoryWidget, SoftmaxChart);
}