import moment from 'moment';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import BreakdownCard from '../components/card/breakdown';
import BDDetailsCard from '../components/card/breakdownDetail';
import CashflowCard from '../components/card/cashflow';
import CFDetailsCard from '../components/card/cashflowDetail';
import GoalCard from '../components/card/goal';
import Header from '../components/headers/minimal';

import { ScreenStyles } from './styles';

import { Categories, CategoryStore, CategoryType, DataStore, DataType } from '../types/data';
import { ReduxThemeType } from '../types/redux';
import { DisplaySectionType, ScreenProps } from '../types/ui';

interface AdditionalReduxProps {
    categories: CategoryStore,
    data: DataStore,
    display: Array<DisplaySectionType>,
}

class Screen extends React.Component<ReduxThemeType & ScreenProps & AdditionalReduxProps> {

    state = {
        bdCategoryKey: '',
        bdCategoryType: Categories.EXPENSE,
        cfCategoryKey: '',
        cfCategoryType: Categories.EXPENSE,
        date: '',
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => this.setState({
            bdCategoryKey: '',
            bdCategoryType: Categories.EXPENSE,
            cfCategoryKey: '',
            cfCategoryType: Categories.EXPENSE,
            date: '',
        }));
    }

    render() {
        let data: Array<{ [key: string]: any }> = [];
        let sevenDaysAgo: moment.Moment = moment().subtract(7, 'days');

        let recordKeys: Array<DisplaySectionType> = this.props.display
            .slice(0, 7)
            .filter((section: DisplaySectionType) => moment(section.date, 'DD-MM-YYYY').isAfter(sevenDaysAgo));

        let categoryKeyArr: Array<string> = [];
        let recordList: Array<DataType> = [];

        recordKeys.map((section: DisplaySectionType) => {
            section.keys.map((key: string) => {
                let record: DataType = this.props.data.data[key];

                if (this.state.cfCategoryType === record.categoryType) {
                    categoryKeyArr.push(record.categoryKey);
                    recordList.push(record);
                }
            });
        });

        let categoryKeys: Array<string> = Array.from(new Set(categoryKeyArr));
        let categories: Array<CategoryType> = [];
        let colors: Array<string> = categoryKeys.map((categoryKey: string) => {
            let category: CategoryType = this.props.categories[this.state.cfCategoryType][categoryKey];
            categories.push(category);

            return category.color;
        });

        for (let i: number = 0; i < 7; i++) {
            sevenDaysAgo.add(1, 'days');

            let datapoint: { [key: string]: any } = {
                date: sevenDaysAgo.format('DD-MM-YYYY'),
            };

            categoryKeys.forEach((key: string) => {
                datapoint[key] = 0;
            });

            data.push(datapoint);
        }

        recordList.forEach((record: DataType) => {
            let index = data.findIndex((datapoint: { [key: string]: any }) => datapoint['date'] === record.date);

            data[index][record.categoryKey] += record.value;
        });

        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header name='analytics' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <CashflowCard
                            categoryList={categories}
                            colorList={colors}
                            dataList={data}
                            keyList={categoryKeys}
                            onSelectCategory={(cfCategoryType: Categories, cfCategoryKey: string) => this.setState({ cfCategoryKey, cfCategoryType, date: '' })}
                            onSelectDate={(date: string) => this.setState({ date, cfCategoryKey: '', cfCategoryType: Categories.EXPENSE })}
                        />
                        <CFDetailsCard
                            categoryKey={this.state.cfCategoryKey}
                            categoryType={this.state.cfCategoryType}
                            dataList={data}
                            date={this.state.date}
                            recordList={recordList}
                        />
                        <BreakdownCard
                            onSelectCategory={(bdCategoryType: Categories, bdCategoryKey: string) => this.setState({ bdCategoryKey, bdCategoryType })}
                        />
                        <BDDetailsCard
                            categoryKey={this.state.bdCategoryKey}
                            categoryType={this.state.bdCategoryType}
                        />
                        <GoalCard />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxProps) => ({
    categories: state.categories,
    data: state.data,
    display: state.display,
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);

