import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import StackChart from '../charts/stack';
import Selector from '../selector';
import CardBase from './base';

import { CashflowCardStyles, GeneralCardStyles, screenWidth } from './styles';

import { ReduxThemeType } from '../../types/redux';
import { Categories, CategoryStore, DataStore } from '../../types/data';

interface AdditionalReduxType {
	categories: CategoryStore,
	data: DataStore,
}

class Card extends React.Component<ReduxThemeType> {

	state = {
		categoryType: Categories.EXPENSE,
	}

	render() {
		const data = [
			{
				apples: 1,
				bananas: 2,
				cherries: 3,
				dates: 4,
			},
			{
				apples: 3,
				bananas: 3,
				cherries: 5,
				dates: 1,
			},
			{
				apples: 2,
				bananas: 4,
				cherries: 1,
				dates: 1,
			},
			{
				apples: 1,
				bananas: 0,
				cherries: 5,
				dates: 2,
			},
			{
				apples: 1,
				bananas: 0,
				cherries: 5,
				dates: 2,
			},
			{
				apples: 1,
				bananas: 0,
				cherries: 5,
				dates: 2,
			},
			{
				bananas: 0,
				apples: 1,
				cherries: 5,
				dates: 2,
			},
		]

		const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
		const keys = ['apples', 'bananas', 'cherries', 'dates']

		return (
			<CardBase icon='chart-timeline-variant' title='7 day cashflow'>
				<View style={GeneralCardStyles.mainContent}>
					<Selector
						onToggle={(categoryType: Categories) => this.setState({ categoryType })}
						selected={this.state.categoryType}
						width={0.85}
					/>
					<View style={CashflowCardStyles.chartPadding}>
						<StackChart
							colors={colors}
							data={data}
							height={250}
							keys={keys}
							width={screenWidth * 0.8}
						/>
					</View>
				</View>
			</CardBase>
		);
	}
}

const mapStateToProps = (state: ReduxThemeType & AdditionalReduxType) => ({
	categories: state.categories,
	data: state.data,
	theme: state.theme,
});

export default connect(mapStateToProps)(Card);
