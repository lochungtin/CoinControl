import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import StackChart from '../charts/stack';
import Selector from '../selector';
import List from '../stats/list';
import CardBase from './base';

import { CashflowCardStyles, GeneralCardStyles, screenWidth } from './styles';

import { Categories, CategoryStore, CategoryType, DataStore, DataType } from '../../types/data';
import { ReduxThemeType } from '../../types/redux';
import { DisplaySectionType } from '../../types/ui';

interface AdditionalReduxType {
	categories: CategoryStore,
	data: DataStore,
	display: Array<DisplaySectionType>,
}

interface DataProps {
	categoryList: Array<CategoryType>,
	colorList: Array<string>,
	dataList: Array<{[key: string]: any}>,
	keyList: Array<string>,
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

        this.setState({ categoryKey, date: '' });
        this.props.onSelectCategory(this.state.categoryType, categoryKey);
    }

	onSelectDate = (date: string) => {
        if (this.state.date === date)
            date = '';

        this.setState({ date, categoryKey: '' });
        this.props.onSelectDate(date);
	}

	onToggleCategory = (categoryType: Categories) => {
        this.setState({ categoryType });
        this.props.onSelectCategory(this.state.categoryType, '');
    }

	render() {
		return (
			<CardBase icon='chart-timeline-variant' title='7 day cashflow'>
				<View style={GeneralCardStyles.mainContent}>
					<Selector
						onToggle={this.onToggleCategory}
						selected={this.state.categoryType}
						width={0.85}
					/>
					{this.props.dataList.length !== 0 && <View style={CashflowCardStyles.chartPadding}>
						<StackChart
							colors={this.props.colorList}
							data={this.props.dataList}
							height={150}
							keys={this.props.keyList}
							onPress={this.onSelectDate}
							width={screenWidth * 0.8}
						/>
					</View>}
					{this.props.dataList.length !== 0 && <List
						categoryList={this.props.categoryList}
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
