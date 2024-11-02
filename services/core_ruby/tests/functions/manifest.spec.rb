require_relative '../../functions/manifest.rb'
require 'test/unit'
require 'json'
 
class TestHandler < Test::Unit::TestCase
    def test_happy_path()
        response = endpoint(event: nil, context: nil)
        assert_equal 200, response[:statusCode]
    end
end