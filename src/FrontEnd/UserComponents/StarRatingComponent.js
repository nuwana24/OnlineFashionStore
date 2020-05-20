import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class StarRatingComponent extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number,
        editing: PropTypes.bool,
        starCount: PropTypes.number,
        starColor: PropTypes.string,
        onStarClick: PropTypes.func,
        onStarHover: PropTypes.func,
        onStarHoverOut: PropTypes.func,
        renderStarIcon: PropTypes.func,
        renderStarIconHalf: PropTypes.func
    };

    static defaultProps = {
        starCount: 5,
        editing: true,
        starColor: '#ffb400',
        emptyStarColor: '#333'
    };

    constructor(props) {
        super();

        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;

        if (value != null && (value !== this.state.value)) {
            this.setState({ value });
        }
    }

    onChange(inputValue) {
        const { editing, value } = this.props;

        if (!editing) {
            return;
        }

        // do not update internal state based on input value if prop passed
        if (value != null) {
            return;
        }

        this.setState({value: inputValue});
    }

    onStarClick(index, value, name, e) {
        e.stopPropagation();

        const { onStarClick, editing } = this.props;

        if (!editing) {
            return;
        }

        onStarClick && onStarClick(index, value, name, e);
    }

    onStarHover(index, value, name, e) {
        e.stopPropagation();

        const { onStarHover, editing } = this.props;

        if (!editing) {
            return;
        }

        onStarHover && onStarHover(index, value, name, e);
    }

    onStarHoverOut(index, value, name, e) {
        e.stopPropagation();

        const { onStarHoverOut, editing } = this.props;

        if (!editing) {
            return;
        }

        onStarHoverOut && onStarHoverOut(index, value, name, e);
    }

    renderStars() {
        const {
            name,
            starCount,
            starColor,
            emptyStarColor,
            editing
        } = this.props;
        const { value } = this.state;

        const starStyles = (i, value) => ({
            float: 'right',
            cursor: editing ? 'pointer' : 'default',
            color: value >= i ? starColor : emptyStarColor
        });
        const radioStyles = {
            display: 'none',
            position: 'absolute',
            marginLeft: -9999
        };

        // populate stars
        let star = [];

        for (let i = starCount; i > 0; i--) {
            const _id = `${name}_${i}`;
            const starInput = (
                <input
                    key={`input_${_id}`}
                    style={radioStyles}
                    className="dv-star-rating-input"
                    type="radio"
                    name={name}
                    _id={_id}
                    value={i}
                    checked={value === i}
                    onChange={this.onChange.bind(this, i, name)}
                />
            );
            const starLabel = (
                <label
                    key={`label_${_id}`}
                    style={starStyles(i, value)}
                    className={'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}
                    htmlFor={_id}
                    onClick={e => this.onStarClick(i, value, name, e)}
                    onMouseOver={e => this.onStarHover(i, value, name, e)}
                    onMouseLeave={e => this.onStarHoverOut(i, value, name, e)}
                >
                    {this.renderIcon(i, value, name, _id)}
                </label>
            );

            star.push(starInput);
            star.push(starLabel);
        }

        return star.length ? star : null;
    }

    renderIcon(index, value, name, _id) {
        const { renderStarIcon, renderStarIconHalf } = this.props;

        if (
            typeof renderStarIconHalf === 'function' &&
            Math.ceil(value) === index &&
            value % 1 !== 0
        ) {
            return renderStarIconHalf(index, value, name, _id);
        }

        if (typeof renderStarIcon === 'function') {
            return renderStarIcon(index, value, name, _id);
        }

        return <i key={`icon_${_id}`} style={{fontStyle: 'normal'}}>&#9733;</i>;
    }

    render() {
        const { editing, className } = this.props;
        const classes = cx('dv-star-rating', {
            'dv-star-rating-non-editable': !editing
        }, className);

        return (
            <div style={{display: 'inline-block', position: 'relative'}} className={classes}>
                {this.renderStars()}
            </div>
        );
    }
}

export default StarRatingComponent;