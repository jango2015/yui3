YUI.add('button-test', function (Y) {

var Assert      = Y.Assert,
    ArrayAssert = Y.ArrayAssert,
    suite;

// -- Suite --------------------------------------------------------------------
suite = new Y.Test.Suite('Buttons');

// -- Methods ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Methods',

    setUp : function () {
        this.button = new Y.Button({
            srcNode : '#test'
        });
    },
    
    tearDown: function () {
        Y.one('#test').empty();
    },

    'button.getNode() should return a Y.Node instance': function () {
        var node = this.button.getNode();
        Assert.isInstanceOf(Y.Node, node);
    },

    'button.simulate(click) should make `selected` attribute = true and `yui3-button-selected` class': function () {
        var button = this.button;
        var node = button.getNode();
        button.set('type', 'toggle');
        
        // Ensure the button is unselected by default
        Assert.isFalse(button.get('selected'));
        Assert.isFalse(node.hasClass('yui3-button-selected'));
        
        // Simulate the button click
        node.simulate('click');
        
        // Now make sure it is selected and has all the approriate attributes
        Assert.isTrue(button.get('selected'));
        Assert.isTrue(node.hasClass('yui3-button-selected'));
        Assert.areSame('true', node.get('aria-selected'));
    },
    
    'button.select() should set the `selected` attribute to `true`': function () {
        var button = this.button;
        var node = button.getNode();
        
        Assert.isFalse(button.get('selected'));
        Assert.isFalse(node.hasClass('yui3-button-selected'));
        button.select();
        Assert.isTrue(button.get('selected'));
        Assert.isTrue(node.hasClass('yui3-button-selected'));
    },

    'button.unselect() should set the `selected` attribute to `false`': function () {
        var button = this.button;
        var node = button.getNode();
        
        button.select();
        Assert.isTrue(button.get('selected'));
        Assert.isTrue(node.hasClass('yui3-button-selected'));
        
        button.unselect();
        Assert.isFalse(button.get('selected'));
        Assert.isFalse(node.hasClass('yui3-button-selected'));
    },

    'button.disable() should set the `disable` attribute to `true`': function () {
        var button = this.button;
        var node = button.getNode();
        
        Assert.isFalse(button.get('disabled'));
        Assert.isFalse(node.hasClass('yui3-button-disabled'));
        button.disable();
        Assert.isTrue(button.get('disabled'));
        Assert.isTrue(node.hasClass('yui3-button-disabled'));
    },

    'button.enable() should set the `disabled` attribute to `false`': function () {
        var button = this.button;
        var node = button.getNode();
        
        button.disable();
        Assert.isTrue(button.get('disabled'));
        Assert.isTrue(node.hasClass('yui3-button-disabled'));
        
        button.enable();
        Assert.isFalse(button.get('disabled'));
        Assert.isFalse(node.hasClass('yui3-button-disabled'));
    },

    
}));

// -- Rendering ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Render',
    
    setUp : function () {
        this.button = new Y.Button({
            srcNode : '#test'
        });
    },
    
    tearDown: function () {
        Y.one('#test').empty();
    },
    
    'button should have `yui3-button` class': function () {
        var button = this.button;
        var node = button.getNode();
        
        Assert.isTrue(node.hasClass('yui3-button'));
    },
    
    'button should have `button` role': function () {
        var button = this.button;
        var node = button.getNode();
        
        Assert.areEqual('button', node.get('role'));
    },
    
    'button mouse events should toggle aria-pressed attributes': function () {
        var button = this.button;
        var node = button.getNode();
        
        node.simulate('mousedown');
        Assert.areSame('true', node.get('aria-pressed'));
        
        node.simulate('mouseup');
        Assert.areSame('false', node.get('aria-pressed'));
    },
    
    'button focus/blur events should toggle yui3-button-focused': function () {
        var button = this.button;
        var node = button.getNode();
        
        Assert.isFalse(node.hasClass('yui3-button-focused'));
        
        node.simulate('focus');
        Assert.isTrue(node.hasClass('yui3-button-focused'));
        
        node.simulate('blur');
        Assert.isFalse(node.hasClass('yui3-button-focused'));
    }
}));

// -- Attributes ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Attributes',
    
    setUp : function () {
        this.button = new Y.Button({
            srcNode : '#test'
        });
    },
    
    tearDown: function () {
        Y.one('#test').empty();
    },

    'setting label attribute should set innerHTML': function () {
        var label;
        var button = this.button;
        var node = button.getNode();
        
        label = 'foobar';
        button.set('label', label);
        Assert.areEqual(label, button.get('label'));
        Assert.areEqual(label, node.getContent());
        
        label = 'fizzbuzz';
        button.set('label', label);
        Assert.areEqual(label, button.get('label'));
        Assert.areEqual(label, node.getContent());
    },
    
    'setting disabled=`true` attribute should add class `yui3-button-disabled`': function () {
        var button = this.button;
        var node = button.getNode();
        
        // Ensure button is enabled by default
        Assert.isFalse(button.get('disabled'));
        Assert.isFalse(node.hasClass('yui3-button-disabled'));
        
        // Disable button
        button.set('disabled', true);
        
        // Ensure button is enabled by default
        Assert.isTrue(button.get('disabled'));
        Assert.isTrue(node.hasClass('yui3-button-disabled'));
    },
    
    'setting disabled=`false` attribute should remove class `yui3-button-disabled`': function () {
        var button = this.button;
        var node = button.getNode();
        
        // Disable button
        button.set('disabled', true);
        
        // Ensure button is disabled
        Assert.isTrue(button.get('disabled'));
        Assert.isTrue(node.hasClass('yui3-button-disabled'));
        
        // Disable button
        button.set('disabled', false);
        
        // Ensure button is enabled
        Assert.isFalse(button.get('disabled'));
        Assert.isFalse(node.hasClass('yui3-button-disabled'));
    },
    
    'setting type=`toggle` attribute should make button toggle-able': function () {
        var button = this.button;
        var node = button.getNode();
        
        // Ensure button is unselected by default
        Assert.isFalse(button.get('selected'));
        
        // Ensure it is a push button
        Assert.areSame('push', button.get('type'));
        
        // Click and check selected state (false)
        node.simulate('click');
        Assert.isFalse(button.get('selected'));
        
        // Click and check selected state (false)
        node.simulate('click');
        Assert.isFalse(button.get('selected'));
        
        // Set to toggle
        button.set('type', 'toggle');
        Assert.areSame('toggle', button.get('type'));
        
        // Click and check selected state (true)
        node.simulate('click');
        Assert.isTrue(button.get('selected'));
        
        // Click and check selected state (false)
        node.simulate('click');
        Assert.isFalse(button.get('selected'));
        
        // Set back to type='push'
        button.set('type', 'push');
        Assert.areSame('push', button.get('type'));
        
        // Click and check selected state (false)
        node.simulate('click');
        Assert.isFalse(button.get('selected'));
        
        // Click and check selected state (false)
        node.simulate('click');
        Assert.isFalse(button.get('selected'));
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['button', 'test', 'node-event-simulate']
});
