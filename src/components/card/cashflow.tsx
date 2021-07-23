import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import StackChart from '../charts/stack';
import Selector from '../selector';
import CardBase from './base';

import { CashflowCardStyles, GeneralCardStyles, screenWidth } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { Categories, CategoryStore, DataStore, DataType } from '../../types/data';
import { DisplaySectionType } from '../../types/ui';
import moment from 'moment';

interface AdditionalReduxType {
	categories: CategoryStore,
	data: DataStore,
	display: Array<DisplaySectionType>,
}

class Card extends React.Component<ReduxThemeType & AdditionalReduxType> {

	state = {
		categoryType: Categories.EXPENSE,
	}

	render() {
		let data: Array<{ [key: string]: number }> = [];
		let sevenDaysAgo: moment.Moment = moment().subtract(7, 'days');

		let recordKeys: Array<DisplaySectionType> = this.props.display
			.slice(0, 7)
			.filter((section: DisplaySectionType) => moment(section.date, 'DD-MM-YYYY').isAfter(sevenDaysAgo));

		let categoryArr: Array<string> = [];
		recordKeys.forEach((section: DisplaySectionType) => {
			section.keys.forEach((key: string) => {
				let record: DataType = this.props.data.data[key];
				if (this.state.categoryType === record.categoryType)
					categoryArr.push(record.categoryKey);
			});
		});

		let categories: Array<string> = Array.from(new Set(categoryArr));
		let colors: Array<string> = categories.map((categoryKey: string) => this.props.categories[this.state.categoryType][categoryKey].color);

		console.log(categories);
		console.log(colors);

		return (
			<CardBase icon='chart-timeline-variant' title='7 day cashflow'>
				<View style={GeneralCardStyles.mainContent}>
					<Selector
						onToggle={(categoryType: Categories) => this.setState({ categoryType })}
						selected={this.state.categoryType}
						width={0.85}
					/>
					{data.length !== 0 && <View style={CashflowCardStyles.chartPadding}>
						<StackChart
							colors={colors}
							data={data}
							height={250}
							keys={categories}
							width={screenWidth * 0.8}
						/>
					</View>}
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
