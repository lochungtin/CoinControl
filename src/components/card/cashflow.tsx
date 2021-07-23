import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import StackChart from '../charts/stack';
import Selector from '../selector';
import List from '../stats/list';
import CardBase from './base';

import { CashflowCardStyles, GeneralCardStyles, screenWidth } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { Categories, CategoryStore, CategoryType, DataStore, DataType } from '../../types/data';
import { DisplaySectionType } from '../../types/ui';
import moment from 'moment';

interface AdditionalReduxType {
	categories: CategoryStore,
	data: DataStore,
	display: Array<DisplaySectionType>,
}

interface DataProps {
    onSelectCategory: (categoryType: Categories, categoryKey: string) => void,
	onSelectDate: (date: string) => void,
}

class Card extends React.Component<ReduxThemeType & AdditionalReduxType & DataProps> {

	state = {
		categoryKey: '',
		categoryType: Categories.EXPENSE,
		date: '',
	}

	onSelectCategory = (categoryKey: string) => {
        if (this.state.categoryKey === categoryKey)
            categoryKey = '';

        this.setState({ categoryKey });
        this.props.onSelectCategory(this.state.categoryType, categoryKey);
    }

	onSelectDate = (date: string) => {
        if (this.state.date === date)
            date = '';

        this.setState({ date });
        this.props.onSelectDate(date);
	}

	onToggleCategory = (categoryType: Categories) => {
        this.setState({ categoryType });
        this.props.onSelectCategory(this.state.categoryType, '');
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

				if (this.state.categoryType === record.categoryType) {
					categoryKeyArr.push(record.categoryKey);
					recordList.push(record);
				}
			});
		});

		let categoryKeys: Array<string> = Array.from(new Set(categoryKeyArr));
		let categories: Array<CategoryType> = [];
		let colors: Array<string> = categoryKeys.map((categoryKey: string) => {
			let category: CategoryType = this.props.categories[this.state.categoryType][categoryKey];
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
			<CardBase icon='chart-timeline-variant' title='7 day cashflow'>
				<View style={GeneralCardStyles.mainContent}>
					<Selector
						onToggle={this.onToggleCategory}
						selected={this.state.categoryType}
						width={0.85}
					/>
					{data.length !== 0 && <View style={CashflowCardStyles.chartPadding}>
						<StackChart
							colors={colors}
							data={data}
							height={150}
							keys={categoryKeys}
							onPress={console.log}
							width={screenWidth * 0.8}
						/>
					</View>}
					{data.length !== 0 && <List
						categoryList={categories}
						onSelectCategory={this.onSelectCategory}
					/>}
				</View>
			</CardBase>
		);
	}
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
	categories: state.categories,
	data: state.data,
	display: state.display,
	theme: state.theme,
});

export default connect(mapStateToProps)(Card);
